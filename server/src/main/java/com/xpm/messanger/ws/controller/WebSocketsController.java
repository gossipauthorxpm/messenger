package com.xpm.messanger.ws.controller;

import com.xpm.messanger.dto.chat.ShowMessage;
import com.xpm.messanger.dto.socket.SocketCreateMessage;
import com.xpm.messanger.dto.socket.SocketSetUserActive;
import com.xpm.messanger.entity.User;
import com.xpm.messanger.service.UserService;
import com.xpm.messanger.service.chat.MessageService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@Controller
@AllArgsConstructor
@SecurityRequirement(name = "Authorization")
public class WebSocketsController {

    private final MessageService messageService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserService userService;


    /**
     * Sending messages from users to a chat topic
     *
     * @param messageDto     the message dto
     * @param headerAccessor the header accessor
     */
    @MessageMapping("/sendMessage")
    public void sendMessage(@RequestBody SocketCreateMessage messageDto, SimpMessageHeaderAccessor headerAccessor) {
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken) headerAccessor.getHeader("simpUser");
        User currentUser = this.userService.getCurrentUser(authentication);
        ShowMessage sentMessage = this.messageService.sendMessageToChat(messageDto.getChatId(), messageDto.getMessage(), currentUser);
        this.simpMessagingTemplate.convertAndSend(String.format("/topic/chat/%s/messages", messageDto.getChatId()), sentMessage);
    }


    /**
     * Sending a user action to the system, what he is currently doing, for example, “Writing a message”
     *
     * @param setUserActiveBody the message dto
     * @param headerAccessor    the header accessor
     */
    @MessageMapping("/sendUserActive")
    public void sendUserActive(@RequestBody SocketSetUserActive setUserActiveBody, SimpMessageHeaderAccessor headerAccessor) {
        log.info("Change {}", setUserActiveBody.getUserActive());
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken) headerAccessor.getHeader("simpUser");
        User currentUser = this.userService.getCurrentUser(authentication);
        currentUser.setActive(setUserActiveBody.getUserActive());
        this.userService.updateUserData(currentUser);
    }
}
