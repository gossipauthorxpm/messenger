package com.xpm.messanger.dto.socket;

import com.xpm.messanger.dto.chat.CreateMessageDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SocketCreateMessage {
    Long chatId;
    CreateMessageDto message;
}
