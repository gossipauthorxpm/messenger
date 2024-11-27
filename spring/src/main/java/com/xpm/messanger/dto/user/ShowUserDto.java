package com.xpm.messanger.dto.user;

import com.xpm.messanger.common.user.UserActive;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
public class ShowUserDto {

    private String login;
    private String email;
    private Boolean isOnline;
    private UserActive active;
    private String name;
    private String surname;
    private String thirdname;
    private String phone;
    private Timestamp createdTime;
}
