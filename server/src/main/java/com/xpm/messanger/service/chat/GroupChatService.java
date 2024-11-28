package com.xpm.messanger.service.chat;

import com.xpm.messanger.common.chat.IChat;
import com.xpm.messanger.dto.chat.ShowChatDto;
import com.xpm.messanger.entity.GroupChat;
import com.xpm.messanger.entity.Message;
import com.xpm.messanger.entity.User;
import com.xpm.messanger.exceptions.ServiceException;
import com.xpm.messanger.mapper.ChatMapper;
import com.xpm.messanger.repository.GroupChatRepository;
import com.xpm.messanger.service.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class GroupChatService {

    private GroupChatRepository groupChatRepository;
    private UserService userService;
    private MessageService messageService;
    private ChatMapper chatMapper;

    @Transactional
    public ShowChatDto createGroupChat(String nameChat) {
        User currentUser = userService.getCurrentUser();
        GroupChat groupChat = new GroupChat().withCreator(currentUser).withName(nameChat);
        return this.chatMapper.toShowChatDto(this.groupChatRepository.save(groupChat));
    }

    @Transactional
    public void addUserInChat(Long chatId, String userLogin) {
        User user = this.userService.findUserBy(userLogin);
        GroupChat groupChat = this.getGroupChatById(chatId);
        groupChat.addUser(user);
        this.groupChatRepository.save(groupChat);
    }

    @Transactional
    public void removeUserFromChat(Long chatId, String userLogin) {
        User user = this.userService.findUserBy(userLogin);
        GroupChat groupChat = this.getGroupChatById(chatId);
        groupChat.removeUser(user);
        this.groupChatRepository.save(groupChat);
    }


    public void deleteMessageAdmin(Long idMessage, Long chatId) {
        GroupChat groupChat = this.getGroupChatById(chatId);
        Message message = this.messageService.getMessageById(idMessage);
        if (!groupChat.isMessageExists(message)) {
            throw new ServiceException("Not access to message!", HttpStatus.FORBIDDEN);
        }
        this.messageService.deleteMessageFromChat(groupChat, message);
    }


    public @NotNull GroupChat getGroupChatById(Long chatId) {
        Optional<GroupChat> groupChat = this.groupChatRepository.findById(chatId);
        if (groupChat.isEmpty()) {
            throw new ServiceException("Group chat not found!");
        }
        return groupChat.get();
    }

}
