package com.xpm.messanger.multithreading.threads;

import com.xpm.messanger.entity.User;
import com.xpm.messanger.mapper.UserMapper;
import com.xpm.messanger.service.FriendRequestService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RequiredArgsConstructor
public class OnlineSocketThread extends Thread {

    private final FriendRequestService friendRequestService;
    private final SimpMessagingTemplate messagingTemplate;
    private final User user;
    private final UserMapper userMapper;
    private boolean running = true;

    @Override
    public void run() {
        while (this.running) {
            try {
                sleep(1000);
                log.info("The data of the user {} friends is transferred to the web socket topic", this.user.getLogin());
                List<User> friendsUser = this.friendRequestService.getAllFriendsForUser(this.user);
                this.messagingTemplate.convertAndSend(String.format("/topic/friends/%s", this.user.getLogin()),
                        friendsUser.stream().map(this.userMapper::userToShowUser).toList());
            } catch (InterruptedException e) {
                log.info("Stream {} urgently interrupted (manually) web socket so close", this.user.getId());
            }
        }
    }

    public void stopRunning() {
        this.running = false;
        this.interrupt();
    }

}
