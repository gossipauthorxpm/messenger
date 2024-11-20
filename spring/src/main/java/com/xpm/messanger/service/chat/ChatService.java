package com.xpm.messanger.service.chat;

import com.xpm.messanger.common.chat.ChatType;
import com.xpm.messanger.common.chat.IChat;
import com.xpm.messanger.dto.chat.ShowMessage;
import com.xpm.messanger.entity.GroupChat;
import com.xpm.messanger.entity.SingleChat;
import com.xpm.messanger.exceptions.ServiceException;
import com.xpm.messanger.mapper.MessageMapper;
import com.xpm.messanger.repository.GroupChatRepository;
import com.xpm.messanger.repository.SingleChatRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ChatService {

    private GroupChatRepository groupChatRepository;
    private SingleChatRepository singleChatRepository;
    private MessageMapper messageMapper;

    /**
     * Retrieves chat by id. Select from all chat types and return their interface
     *
     * @param chatId the chat id
     * @return {@link IChat}
     */
    public @NotNull IChat getAnotherChatById(Long chatId) {
        IChat chat = null;

        Optional<GroupChat> groupChat = groupChatRepository.findById(chatId);
        Optional<SingleChat> singleChat = singleChatRepository.findById(chatId);

        if(singleChat.isPresent()) {
            chat = singleChat.get();
        }
        if(groupChat.isPresent()) {
            chat = groupChat.get();
        }

        if (chat == null) {
            throw new ServiceException("Chat not found!", HttpStatus.NOT_FOUND);
        }

        return chat;
    }

    @Transactional
    public void deleteChatById(Long chatId, ChatType chatType) {
        if(chatType == ChatType.SINGLE) {
            Optional<SingleChat> singleChat = singleChatRepository.findById(chatId);
            singleChat.ifPresent(chat -> this.singleChatRepository.delete(chat));
        }
        if(chatType == ChatType.GROUP) {
            Optional<GroupChat> groupChat = groupChatRepository.findById(chatId);
            groupChat.ifPresent(chat -> this.groupChatRepository.delete(chat));
        }
    }

    public List<ShowMessage> getAllMessagesFromChat(Long chatId, ChatType chatType) {
        IChat chat = this.getLocalChat(chatId, chatType);

        return chat.getAllMessages().stream().map(message -> this.messageMapper.toShowMessage(message)).toList();
    }

    @Transactional
    public void updateChat(IChat chat) {
        if(chat instanceof SingleChat) {
            this.singleChatRepository.save((SingleChat) chat);
        }
        if(chat instanceof GroupChat) {
            this.groupChatRepository.save((GroupChat) chat);
        }
    }

    /**
     * Retrieves chat by id and chat type, needed for internal
     * chat selection from the controller executing the request
     *
     * @param chatId {@link Long} id chat
     * @param chatType {@link ChatType} type chat
     * @return {@link IChat}
     */
    private @NotNull IChat getLocalChat(Long chatId, ChatType chatType) {
        IChat chat = null;

        Optional<GroupChat> groupChat = groupChatRepository.findById(chatId);
        Optional<SingleChat> singleChat = singleChatRepository.findById(chatId);
        if(chatType == ChatType.SINGLE && singleChat.isPresent()) {
            chat = singleChat.get();
        }
        if(chatType == ChatType.GROUP && groupChat.isPresent()) {
            chat = groupChat.get();
        }

        if (chat == null) {
            throw new ServiceException("Chat not found!", HttpStatus.NOT_FOUND);
        }
        return chat;
    }

}
