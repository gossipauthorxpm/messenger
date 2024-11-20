package com.xpm.messanger.common.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xpm.messanger.entity.Message;
import com.xpm.messanger.entity.User;

import java.util.List;

/**
 * Needed to combine chat types under 1 working interface
 */
public interface IChat {
    @JsonIgnore
    List<Message> getAllMessages();
    List<User> getUsersChat();
    Long getId();
    User getCreator();
    Boolean isGroup();
    String getNameChat();
    void sendMessage(Message message);
    void deleteMessage(Message message);

}
