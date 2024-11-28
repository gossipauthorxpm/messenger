package com.xpm.messanger.service;


import com.xpm.messanger.dto.user.ShowUserDto;
import com.xpm.messanger.dto.user.UpdateUserDto;
import com.xpm.messanger.entity.User;
import com.xpm.messanger.exceptions.ServiceException;
import com.xpm.messanger.mapper.UserMapper;
import com.xpm.messanger.repository.UserRepository;
import depends.common.LogMessage;
import depends.common.TypeLog;
import depends.common.TypeSender;
import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private UserMapper userMapper;
    private LoggerService loggerService;

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
//            ЗАМЕНИТЬ ИСКЛЮЧЕНИЕ НА ДРУГОЙ ТИП
            this.loggerService.sendMessage("Error in obtaining user data and state authorization", TypeSender.SYSTEM, TypeLog.WARN);
            throw new ServiceException("Could not determine the current user!");
        } else {
            String currentUserLogin = authentication.getName();
            this.loggerService.sendMessage(String.format("User %s successfully received his data and state authentication", currentUserLogin), TypeSender.USER, TypeLog.DEBUG);
            return this.findUserBy(currentUserLogin);
        }
    }

    public User getCurrentUser(@Nullable UsernamePasswordAuthenticationToken authentication) {
        if (authentication == null) {
            this.loggerService.sendMessage("Error in obtaining user data and state authorization", TypeSender.SYSTEM, TypeLog.WARN);
            throw new ServiceException("Could not determine the current user!");
        }
        String currentUserLogin = authentication.getName();
        this.loggerService.sendMessage(String.format("User %s successfully received his data and state authentication", currentUserLogin), TypeSender.USER, TypeLog.DEBUG);
        return this.findUserBy(currentUserLogin);
    }

    @Transactional
    public void saveUser(User userForSave) throws ServiceException {
        if (this.userRepository.existsByLogin(userForSave.getLogin())) {
            this.loggerService.sendMessage(String.format("User %s cannot be saved, there is a user with this login in the system", userForSave.getLogin()), TypeSender.SYSTEM, TypeLog.WARN);
            throw new ServiceException(String.format(
                    "User with login - %s already exists!", userForSave.getLogin()
            ), HttpStatus.CONFLICT);
        }
        if (this.userRepository.existsByEmail(userForSave.getEmail())) {
            this.loggerService.sendMessage(String.format("User %s cannot be saved, there is a user with this email in the system", userForSave.getLogin()), TypeSender.SYSTEM, TypeLog.WARN);
            throw new ServiceException(String.format(
                    "User with email - %s already exists!", userForSave.getEmail()
            ),
                    HttpStatus.CONFLICT);
        }
        this.loggerService.sendMessage(String.format("User %s be saved in the system", userForSave.getLogin()), TypeSender.SYSTEM, TypeLog.INFO);
        this.userRepository.save(userForSave);
    }


    public User findUserBy(Long id) {
        Optional<User> user = this.userRepository.findById(id);
        if (user.isEmpty()) {
            this.loggerService.sendMessage(String.format("User %s has not found", id), TypeSender.SYSTEM, TypeLog.WARN);
            throw new ServiceException("User not found!", HttpStatus.NOT_FOUND);
        }
        return user.get();
    }


    public @NotNull User findUserBy(String login) {
        Optional<User> user = this.userRepository.findUserByLogin(login);
        if (user.isEmpty()) {
            this.loggerService.sendMessage(String.format("User %s has not found", login), TypeSender.SYSTEM, TypeLog.WARN);
            throw new ServiceException("User not found!", HttpStatus.NOT_FOUND);
        }
        return user.get();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findUserByLogin(username).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
    }


    public ShowUserDto getCurrentUserHttp() {
        User user = this.getCurrentUser();
        return this.userMapper.userToShowUser(user);
    }

    @Transactional
    public void updateUserData(UpdateUserDto userDto) {
        User user = this.getCurrentUser();
        User userUpdated = user
                .withName(userDto.getName())
                .withPhone(userDto.getPhone())
                .withSurname(userDto.getSurname())
                .withThirdname(userDto.getThirdname());
        this.loggerService.sendMessage(String.format("Attempting to update user %s", user.getLogin()), TypeSender.SYSTEM, TypeLog.INFO);
        this.userRepository.save(userUpdated);
    }

    @Transactional
    public void updateUserData(User user) {
        this.loggerService.sendMessage(String.format("Attempting to update user %s", user.getLogin()), TypeSender.SYSTEM, TypeLog.INFO);
        this.userRepository.save(user);
    }


}
