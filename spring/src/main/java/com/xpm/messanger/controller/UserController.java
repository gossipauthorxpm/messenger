package com.xpm.messanger.controller;

import com.xpm.messanger.dto.user.UpdateUserDto;
import com.xpm.messanger.http.HttpResponse;
import com.xpm.messanger.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@SecurityRequirement(name = "Authorization")
@AllArgsConstructor
@RestController
@RequestMapping("/api/user")
@Tag(name = "Пользователь", description = "Работа с учетными данными пользователя")
public class UserController {

    private UserService userService;

    @Operation(summary = "Получить данные текущего пользователя")
    @GetMapping
    public HttpResponse getCurrentUser() {
        return new HttpResponse("Successful data retrieval!", this.userService.getCurrentUserHttp());
    }

    @Operation(summary = "Обновить данные пользователя")
    @PutMapping
    public HttpResponse updateCurrentUserData(@RequestBody UpdateUserDto userDto) {
        this.userService.updateUserData(userDto);
        return new HttpResponse("Successful data update!");
    }

}
