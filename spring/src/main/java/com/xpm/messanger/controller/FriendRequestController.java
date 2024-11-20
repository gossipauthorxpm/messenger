package com.xpm.messanger.controller;

import com.xpm.messanger.http.HttpResponse;
import com.xpm.messanger.service.FriendRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@SecurityRequirement(name = "Authorization")
@RequestMapping("/api/user/friends")
@Tag(name = "Управление друзьями", description = "Интерфейс для управления друзьями пользователя")
public class FriendRequestController {

    private final FriendRequestService friendRequestService;

    @Operation(summary = "Получить все полученные запросы в друзья")
    @GetMapping("/taken")
    public HttpResponse getAllTakenFriendRequests() {
        return new HttpResponse("Success retrieval recipient friends requests!", this.friendRequestService.getAllTakenRequests());
    }

    @Operation(summary = "Получить все отправленные запросы в друзья")
    @GetMapping("/sent")
    public HttpResponse getAllSentFriendRequests() {
        return new HttpResponse("Success retrieval sent friends request!", this.friendRequestService.getAllSentRequests());
    }

    @Operation(summary = "Отправить запрос в друзья")
    @PostMapping("")
    public HttpResponse sendFriendRequest(@PathParam("login") String login, @PathParam("message") String message) {
        this.friendRequestService.sendFriendRequest(login, message);
        return new HttpResponse("Send friend request successful!");
    }

    @Operation(summary = "Подтвердить на запрос в друзья")
    @PutMapping("/accept")
    public HttpResponse answerFriendRequest(@PathParam("id") Long idFriendRequest) {
        this.friendRequestService.acceptFriendRequest(idFriendRequest);
        return new HttpResponse("Accepted request friend success!");
    }

    @Operation(summary = "Удалить пользователя из друзей")
    @DeleteMapping("")
    public HttpResponse deleteFriendRequest(@PathParam("login") String userLogin) {
        this.friendRequestService.deleteFriendRequest(userLogin);
        return new HttpResponse("Delete friend success!");
    }

    @Operation(summary = "Отвергнуть заявку в друзья")
    @DeleteMapping("/decline")
    public HttpResponse declineFriendRequest(@PathParam("idFriendRequest") Long id) {
        this.friendRequestService.deleteFriendRequest(id);
        return new HttpResponse("Reject friend request success!");
    }

    @Operation(summary = "Получить всех друзей пользователя")
    @GetMapping
    public HttpResponse getAllFriendsCurrentUser() {
        return new HttpResponse("Successful friends retrieval!", this.friendRequestService.getAllFriendsForUser());
    }

}
