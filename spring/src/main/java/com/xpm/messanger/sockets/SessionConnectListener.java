package com.xpm.messanger.sockets;


import com.xpm.messanger.entity.User;
import com.xpm.messanger.multithreading.SocketThreadExecutor;
import com.xpm.messanger.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

import java.util.Objects;

@Slf4j
@Component
@RequiredArgsConstructor
public class SessionConnectListener implements ApplicationListener<SessionConnectedEvent> {

    private final UserService userService;
    private final SocketThreadExecutor threadExecutor;

    @Override
    public void onApplicationEvent(SessionConnectedEvent event) {
        User user = this.userService.findUserBy(Objects.requireNonNull(event.getUser()).getName());
        user.setIsOnline(true);
        this.userService.updateUserData(user);
        this.threadExecutor.createAndRun(user);
    }
}
