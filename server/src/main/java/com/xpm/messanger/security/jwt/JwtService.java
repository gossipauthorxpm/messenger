package com.xpm.messanger.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.security.auth.message.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Service
@RequiredArgsConstructor
public class JwtService implements IJwtService {

    @Value("${token.signing.key}")
    private String jwtSigningKey;

    private static final long JWT_TOKEN_VALIDITY = 1000 * 60 * 24; // 24 часа для access токенов
    private static final long JWT_REFRESH_TOKEN_VALIDITY = 1000 * 60 * 60 * 24 * 7; // 7 дней для refresh токенов

    @Override
    public String extractUserName(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (MalformedJwtException exception) {
            return null;
        }

    }

    @Override
    public String generateToken(String userName) {
        return generateToken(Map.of("type", "auth"), userName); // Используем имя пользователя для генерации
    }

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        if (token == null || token.isEmpty() || this.isRefreshToken(token)) {
            return false;
        }
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    // Генерация обычного access токена
    private String generateToken(Map<String, Object> extraClaims, String userName) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY)) // срок действия - 24 часа
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Генерация refresh токена с более длительным сроком действия
    public String generateRefreshToken(String userName) {
        return Jwts.builder()
                .setClaims(Map.of("type", "refresh")) // можно передавать дополнительные данные в claims, если нужно
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_REFRESH_TOKEN_VALIDITY))  // срок действия - 7 дней
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Проверка, истек ли токен
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private String extractTypeToken(String token) {
        Claims claims = this.extractAllClaims(token);
        return (String) claims.get("type");
    }

    private boolean isRefreshToken(String token) {
        return extractTypeToken(token).equals("refresh");
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSigningKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    // Новый метод для обновления access токена с использованием refresh токена
    public String refreshAccessToken(String refreshToken) {
        // Проверка, что refresh токен действителен
        if (isTokenExpired(refreshToken)) {
            throw new RuntimeException("Refresh token has expired, please authenticate again.");
        }

        // Извлекаем имя пользователя из refresh токена
        String userName = extractUserName(refreshToken);

        // Генерируем новый access токен для этого пользователя
        return generateToken(userName); // Создаём новый access токен
    }
}


