package com.xpm.messanger.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShowUserInMessage {
    private String login;
    private String email;
    private String name;
    private String surname;
}
