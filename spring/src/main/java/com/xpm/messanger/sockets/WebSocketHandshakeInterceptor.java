package com.xpm.messanger.sockets;

import com.xpm.messanger.entity.User;
import com.xpm.messanger.security.jwt.JwtService;
import com.xpm.messanger.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Cache;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;

import java.util.Collections;
import java.util.Map;


@AllArgsConstructor
@Component
public class WebSocketHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtService jwtTokenProvider;
    private final UserService userService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        String token = request.getURI().getQuery();
//        if (token != null && token.startsWith("token=")) {
//            token = token.substring(6);  // Убираем "Bearer " из токена
//            String userName = jwtTokenProvider.extractUserName(token);
//            User user = this.userService.findUserBy(userName);
//            if (jwtTokenProvider.isTokenValid(token, user)) {
//                // Устанавливаем аутентификацию в SecurityContext
//                SecurityContext context = SecurityContextHolder.createEmptyContext();
//                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                        user, null, user.getAuthorities());
//                // Установка аутентификации в контекст безопасности
//                context.setAuthentication(authToken);
//                SecurityContextHolder.setContext(context);
//            }else throw new AuthenticationCredentialsNotFoundException("Forbidden");
//        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception ex) {
        // Извлечение токена из заголовков WebSocket-соединения
    }
}