package com.xpm.messanger.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SocketCreateMessage {
    Long chatId;
    CreateMessageDto message;
}
