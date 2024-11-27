package com.xpm.messanger.sockets;

import com.xpm.messanger.dto.chat.ShowMessage;
import com.xpm.messanger.dto.chat.SocketCreateMessage;
import com.xpm.messanger.service.chat.MessageService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@AllArgsConstructor
@SecurityRequirement(name = "Authorization")
public class WebSocketsController {

    private final MessageService messageService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/sendMessage")
    public void sendMessage(@RequestBody SocketCreateMessage messageDto, SimpMessageHeaderAccessor headerAccessor) {
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken) headerAccessor.getHeader("simpUser");
        ShowMessage sentMessage = this.messageService.sendMessageToChat(messageDto.getChatId(), messageDto.getMessage(), authentication);
        this.simpMessagingTemplate.convertAndSend(String.format("/topic/chat/%s/messages", messageDto.getChatId()), sentMessage);
    }

}
