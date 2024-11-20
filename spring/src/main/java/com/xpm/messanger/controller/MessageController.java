package com.xpm.messanger.controller;

import com.xpm.messanger.dto.chat.CreateMessageDto;
import com.xpm.messanger.http.HttpResponse;
import com.xpm.messanger.service.chat.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@SecurityRequirement(name = "Authorization")
@AllArgsConstructor
@CrossOrigin("${cors.name}")
@RestController
@RequestMapping("/api/messenger/chat")
@Tag(name = "Сообщения в чате", description = "Управление сообщениями в чате")
public class MessageController {

    private final MessageService messageService;

    @Operation(summary = "Отправить сообщение")
    @PostMapping("/{chatId}")
    public HttpResponse sendMessage(@PathVariable("chatId") Long idChat, @RequestBody CreateMessageDto messageDto) {
        this.messageService.sendMessageToChat(idChat, messageDto);
        return new HttpResponse("Message sent successfully!");
    }

    @Operation(summary = "Изменить сообщение")
    @PutMapping("")
    public void updateMessage(@PathParam("idMessage") Long idChat){

    }

    @Operation(summary = "Удалить сообщение")
    @DeleteMapping("")
    public HttpResponse deleteMessage(@PathParam("idMessage") Long idMessage){
        this.messageService.deleteMessage(idMessage);
        return new HttpResponse("Message delete successfully!");
    }

}
