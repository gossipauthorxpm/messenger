package com.xpm.messanger.service.chat;

import com.xpm.messanger.entity.SingleChat;
import com.xpm.messanger.entity.User;
import com.xpm.messanger.exceptions.ServiceException;
import com.xpm.messanger.mapper.ChatMapper;
import com.xpm.messanger.repository.SingleChatRepository;
import com.xpm.messanger.service.UserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SingleChatService {

    private SingleChatRepository singleChatRepository;
    private ChatMapper chatMapper;

    private UserService userService;

    @Transactional
    public Long createSingleChat(String receiverLogin) {
        User currentUser = this.userService.getCurrentUser();
        User reciverUser = this.userService.findUserBy(receiverLogin);
        if (reciverUser == null) {
            throw new ServiceException("Receiver does not exist!", HttpStatus.CONFLICT);
        }
        SingleChat singleChatEntity = new SingleChat();
        SingleChat createdSingleChat = this.singleChatRepository.save(
                singleChatEntity
                .withFirstSender(currentUser)
                .withSecondSender(reciverUser)
        );

        return createdSingleChat.getId();

    }

}
