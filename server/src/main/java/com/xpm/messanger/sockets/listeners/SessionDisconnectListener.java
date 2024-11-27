package com.xpm.messanger.sockets.listeners;

import com.xpm.messanger.entity.User;
import com.xpm.messanger.multithreading.SocketThreadExecutor;
import com.xpm.messanger.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class SessionDisconnectListener implements ApplicationListener<SessionDisconnectEvent> {

    private final UserService userService;
    private final SocketThreadExecutor threadExecutor;

    // Обработка события отключения сессии
    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        User user = this.userService.findUserBy(Objects.requireNonNull(event.getUser()).getName());
        user.setIsOnline(false);
        this.userService.updateUserData(user);
        this.threadExecutor.deleteForUser(user);
    }
}