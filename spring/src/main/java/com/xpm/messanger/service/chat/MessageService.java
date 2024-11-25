package com.xpm.messanger.service.chat;

import com.xpm.messanger.common.chat.IChat;
import com.xpm.messanger.dto.chat.CreateMessageDto;
import com.xpm.messanger.dto.chat.ShowMessage;
import com.xpm.messanger.entity.Message;
import com.xpm.messanger.entity.User;
import com.xpm.messanger.exceptions.ServiceException;
import com.xpm.messanger.mapper.ChatMapper;
import com.xpm.messanger.mapper.MessageMapper;
import com.xpm.messanger.repository.MessageRepository;
import com.xpm.messanger.service.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatService chatService;
    private final UserService userService;
    private final ChatMapper chatMapper;
    private final MessageMapper messageMapper;

    public @NotNull Message getMessageById(Long id) {
        Optional<Message> message = messageRepository.findById(id);
        if(message.isEmpty()) {throw new ServiceException("Message not found!", HttpStatus.NOT_FOUND);
        }
        return message.get();
    }

    public ShowMessage sendMessageToChat(Long idChat, CreateMessageDto messageDto) {
        IChat chat = this.chatService.getAnotherChatById(idChat);
        User currentUser = this.userService.getCurrentUser();
        Message message = new Message()
                .withSender(currentUser)
                .withContent(messageDto.getContent());
        Message sendedMessage = this.messageRepository.save(message);
        chat.sendMessage(message);
        this.chatService.updateChat(chat);
        return this.messageMapper.toShowMessage(sendedMessage);
    }

    public ShowMessage sendMessageToChat(Long idChat, CreateMessageDto messageDto, UsernamePasswordAuthenticationToken authentication) {
        IChat chat = this.chatService.getAnotherChatById(idChat);
        User currentUser = this.userService.getCurrentUser(authentication);
        Message message = new Message()
                .withSender(currentUser)
                .withContent(messageDto.getContent());
        Message sendedMessage = this.messageRepository.save(message);
        chat.sendMessage(message);
        this.chatService.updateChat(chat);
        return this.messageMapper.toShowMessage(sendedMessage);
    }

    @Transactional
    public void deleteMessage(Long idMessage) {
        this.messageRepository.deleteById(idMessage);
    }

    @Transactional
    public void deleteMessageFromChat(IChat chat, Message message) {
        chat.deleteMessage(message);
        this.messageRepository.deleteById(message.getId());
    }

    @Transactional
    public void readMessage(Long idMessage) {
        Message message = this.getMessageById(idMessage);
        message.setRead(true);
        this.messageRepository.save(message);
    }


}
