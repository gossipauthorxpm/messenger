package com.xpm.messanger.common.chat;

import com.xpm.messanger.entity.Message;
import com.xpm.messanger.entity.User;

import java.util.List;

/**
 * Needed to combine chat types under 1 working interface
 */
public interface IChat {

    List<Message> getAllMessages();

    List<User> getUsersChat();

    void sendMessage(Message message);
    void deleteMessage(Message message);

}
