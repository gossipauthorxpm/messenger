package com.xpm.messanger.service;

import com.xpm.messanger.dto.jwt.ShowToken;
import com.xpm.messanger.dto.user.AuthUserDto;
import com.xpm.messanger.dto.user.RegisterUserDto;
import com.xpm.messanger.entity.User;
import com.xpm.messanger.exceptions.ServiceException;
import com.xpm.messanger.mapper.UserMapper;
import com.xpm.messanger.repository.UserRepository;
import com.xpm.messanger.security.jwt.JwtService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {

    private UserMapper userMapper;
    private UserService userService;
    private JwtService jwtService;
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;


    public void registerUser(RegisterUserDto userDto) {
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        User user = this.userMapper.registerToUser(userDto);
        this.userService.saveUser(user);
    }

    @Transactional
    public ShowToken authUser(AuthUserDto userDto) {
        User user = this.userService.findUserBy(userDto.getUsername());
        user.setIsOnline(true);
        userRepository.save(user);
        if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            throw new ServiceException("Invalid username or password!", HttpStatus.FORBIDDEN);
        }
        return this.createToken(userDto);
    }

    public ShowToken refreshAuthToken(String refreshToken) {
        return ShowToken.builder()
                .refreshToken(null)
                .authToken(this.jwtService.refreshAccessToken(refreshToken))
                .build();
    }

    private ShowToken createToken(AuthUserDto request) {
        User user = this.userService.findUserBy(request.getUsername());
        return ShowToken.builder()
                .authToken(this.jwtService.generateToken(user.getUsername()))
                .refreshToken(this.jwtService.generateRefreshToken(user.getUsername()))
                .build();
    }


}
