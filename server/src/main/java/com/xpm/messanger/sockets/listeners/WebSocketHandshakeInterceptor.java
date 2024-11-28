package com.xpm.messanger.sockets.listeners;

import com.xpm.messanger.security.jwt.JwtService;
import com.xpm.messanger.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;

import java.util.Map;

@Deprecated
@AllArgsConstructor
@Component
public class WebSocketHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtService jwtTokenProvider;
    private final UserService userService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}