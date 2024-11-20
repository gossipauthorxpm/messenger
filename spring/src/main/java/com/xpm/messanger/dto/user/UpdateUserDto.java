package com.xpm.messanger.dto.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateUserDto {
    private String name;
    private String surname;
    private String thirdname;
    private String phone;
}
