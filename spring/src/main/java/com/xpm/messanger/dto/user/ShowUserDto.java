package com.xpm.messanger.dto.user;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
public class ShowUserDto {

    private String login;
    private String email;

    private String name;
    private String surname;
    private String thirdname;

    private String phone;
    private Timestamp createdTime;
}
