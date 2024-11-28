package com.xpm.messanger.service;


import com.xpm.messanger.dto.friend.ShowFriendRequest;
import com.xpm.messanger.dto.user.ShowUserDto;
import com.xpm.messanger.dto.user.UpdateUserDto;
import com.xpm.messanger.entity.User;
import com.xpm.messanger.exceptions.ServiceException;
import com.xpm.messanger.mapper.UserMapper;
import com.xpm.messanger.repository.UserRepository;
import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private UserMapper userMapper;

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
//            ЗАМЕНИТЬ ИСКЛЮЧЕНИЕ НА ДРУГОЙ ТИП
            throw new ServiceException("Could not determine the current user!");
        } else {
            String currentUserLogin = authentication.getName();
            return this.findUserBy(currentUserLogin);
        }
    }

    public User getCurrentUser(@Nullable UsernamePasswordAuthenticationToken authentication) {
        if (authentication == null) {
            throw new ServiceException("Could not determine the current user!");
        }
        String currentUserLogin = authentication.getName();
        return this.findUserBy(currentUserLogin);
    }

    @Transactional
    public void saveUser(User userForSave) throws ServiceException {
        if (this.userRepository.existsByLogin(userForSave.getLogin())) {
            throw new ServiceException(String.format(
                    "User with login - %s already exists!", userForSave.getLogin()
            ), HttpStatus.CONFLICT);
        }
        if (this.userRepository.existsByEmail(userForSave.getEmail())) {
            throw new ServiceException(String.format(
                    "User with email - %s already exists!", userForSave.getEmail()
            ),
                    HttpStatus.CONFLICT);
        }
        this.userRepository.save(userForSave);
    }


    public User findUserBy(Long id) {
        Optional<User> user = this.userRepository.findById(id);
        if (user.isEmpty()) {
            throw new ServiceException("User not found!", HttpStatus.NOT_FOUND);
        }
        return user.get();
    }


    public @NotNull User findUserBy(String login) {
        Optional<User> user = this.userRepository.findUserByLogin(login);
        if (user.isEmpty()) {
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
        this.userRepository.save(userUpdated);
    }

    @Transactional
    public void updateUserData(User user) {
        this.userRepository.save(user);
    }


}
