package com.xpm.messanger.dto.chat;

import com.xpm.messanger.dto.user.ShowUserDto;
import jakarta.websocket.server.ServerEndpoint;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
public class ShowChatDto {
    private Long id;
    private List<ShowUserDto> usersChat;
    private Boolean isGroup;
    private ShowUserDto creator;
    private String chatName;
}
