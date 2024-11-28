package com.xpm.messanger.rest.controller;

import com.xpm.messanger.common.chat.ChatType;
import com.xpm.messanger.dto.chat.CreateMessageDto;
import com.xpm.messanger.http.HttpResponse;
import com.xpm.messanger.service.chat.ChatService;
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
@RequestMapping("/api/messenger")
@Tag(name = "Сообщения в чате", description = "Управление сообщениями в чате")
public class MessageController {

    private final MessageService messageService;
    private final ChatService chatService;

    @Operation(summary = "Отправить сообщение")
    @PostMapping("/{chatId}")
    public HttpResponse sendMessage(@PathVariable("chatId") Long idChat, @RequestBody CreateMessageDto messageDto) {
        return new HttpResponse("Message sent successfully!", this.messageService.sendMessageToChat(idChat, messageDto));
    }

    @Operation(summary = "Изменить сообщение")
    @PutMapping("")
    public void updateMessage(@PathParam("idMessage") Long idMessage) {

    }

    @Operation(summary = "Прочитать сообщение")
    @PutMapping("/read")
    public HttpResponse readMessage(@PathParam("idMessage") Long idMessage) {
        this.messageService.readMessage(idMessage);
        return new HttpResponse("Success read message");
    }

    @Operation(summary = "Удалить сообщение")
    @DeleteMapping("")
    public HttpResponse deleteMessage(@PathParam("idMessage") Long idMessage) {
        this.messageService.deleteMessage(idMessage);
        return new HttpResponse("Message delete successfully!");
    }

    @Operation(summary = "Получить чаты")
    @GetMapping("/chats")
    public HttpResponse getSingleChats() {
        return new HttpResponse("Success get all chats", this.chatService.getAllChats());
    }

    @Operation(summary = "Получить сообщения из чата")
    @GetMapping("/chats/{idChat}")
    public HttpResponse getMessagesFromGroupChat(@PathVariable("idChat") Long idChat, @PathParam("typeChat") ChatType typeChat) {
        return new HttpResponse("Success fetch all messages from chat!", this.chatService.getAllMessagesFromChat(idChat, typeChat));
    }
}
