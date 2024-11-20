package com.xpm.messanger.controller;

import com.xpm.messanger.common.chat.ChatType;
import com.xpm.messanger.http.HttpResponse;
import com.xpm.messanger.service.chat.ChatService;
import com.xpm.messanger.service.chat.SingleChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@SecurityRequirement(name = "Authorization")
@AllArgsConstructor
@RestController
@RequestMapping("/api/messenger/manager/chat")
@Tag(name = "Управление чатами", description = "Интерфейс для управление чатами")
public class ManagementSingleChatController {

    private SingleChatService singleChatService;
    private ChatService chatService;

    @Operation(summary = "Создать чат")
    @PostMapping("")
    public HttpResponse createChat(@PathParam("receiverLogin") String receiverLogin){
        return new HttpResponse("Single chat is created. Id single chat returns!",
                this.singleChatService.createSingleChat(receiverLogin));
    }

    @Operation(summary = "Удалить чат")
    @DeleteMapping("")
    public HttpResponse deleteChat(@PathParam("idChat") Long idChat){
        this.chatService.deleteChatById(idChat, ChatType.SINGLE);
        return new HttpResponse("Success delete!");
    }
}
