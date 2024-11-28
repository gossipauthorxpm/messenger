package com.xpm.messanger.rest.controller;

import com.xpm.messanger.dto.user.AuthUserDto;
import com.xpm.messanger.dto.user.RegisterUserDto;
import com.xpm.messanger.http.HttpResponse;
import com.xpm.messanger.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth/")
@Tag(name = "Авторизация", description = "Авторизация и регистрация пользователей в систему")
public class AuthController {

    private AuthService authService;

    @Operation(summary = "Регистрация")
    @PostMapping("register")
    public HttpResponse register(@RequestBody @Valid RegisterUserDto userDto) {

        this.authService.registerUser(userDto);
        return new HttpResponse("User is registered successfully!");

    }

    @Operation(summary = "Авторизация")
    @PostMapping("login")
    public HttpResponse auth(@RequestBody @Valid AuthUserDto userDto) {
        return new HttpResponse("User auth successfully!", this.authService.authUser(userDto));

    }

    @Operation(summary = "Обновление токена")
    @PostMapping("login/refresh/{token}")
    public HttpResponse restore(@PathVariable("token") String token) {
        return new HttpResponse("Access token is refreshed!", this.authService.refreshAuthToken(token));
    }
}
