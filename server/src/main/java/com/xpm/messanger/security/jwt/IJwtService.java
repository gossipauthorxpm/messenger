package com.xpm.messanger.security.jwt;

import jakarta.security.auth.message.AuthException;
import org.springframework.security.core.userdetails.UserDetails;

public interface IJwtService {
    String extractUserName(String token);

    String generateToken(String userName);

    boolean isTokenValid(String token, UserDetails userDetails) throws AuthException;
}
