package com.xpm.messanger.controller;

import com.xpm.messanger.common.chat.ChatType;
import com.xpm.messanger.http.HttpResponse;
import com.xpm.messanger.service.chat.ChatService;
import com.xpm.messanger.service.chat.GroupChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@SecurityRequirement(name = "Authorization")
@AllArgsConstructor
@RestController
@RequestMapping("/api/messenger/manager/groupChat")
@Tag(name = "Управление групповыми чатами", description = "Интерфейс для управление групповыми чатами")
public class ManagementGroupChatController {

    private GroupChatService groupChatService;
    private ChatService chatService;

    @Operation(summary = "Создать чат")
    @PostMapping("")
    public HttpResponse createGroupChat(@PathParam("nameChat") String nameChat) {
        return new HttpResponse("Group chat is created. Id group chat returns!", this.groupChatService.createGroupChat(nameChat));
    }

    @Operation(summary = "Удалить чат")
    @DeleteMapping("")
    public HttpResponse deleteGroupChat(@PathParam("idChat") Long idChat) {
        this.chatService.deleteChatById(idChat, ChatType.GROUP);
        return new HttpResponse("Success delete!");
    }

    @Operation(summary = "Удалить сообщение (Для создателя чата)")
    @DeleteMapping("/message")
    public HttpResponse deleteMessageForAdminChat(@PathParam("idChat") Long idChat, @PathParam("idMessage") Long idMessage) {
        this.groupChatService.deleteMessageAdmin(idMessage, idChat);
        return new HttpResponse("Success delete!");
    }

    @Operation(summary = "Добавить участника в чат")
    @PostMapping("/user")
    public HttpResponse addUserToGroupChat(@PathParam("idChat") Long idChat, @PathParam("userLogin") String userLogin) {
        this.groupChatService.addUserInChat(idChat, userLogin);
        return new HttpResponse("Success add user in chat!");
    }

    @Operation(summary = "Удалить участника из чата")
    @DeleteMapping("/user")
    public HttpResponse deleteUserFromGroupChat(@PathParam("idChat") Long idChat, @PathParam("userLogin") String userLogin) {
        this.groupChatService.removeUserFromChat(idChat, userLogin);
        return new HttpResponse("Success delete user from chat!");
    }


}
