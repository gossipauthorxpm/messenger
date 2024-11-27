package com.xpm.messanger.dto.friend;

import com.xpm.messanger.dto.user.ShowUserDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShowFriendRequest {
    private Long id;
    private ShowUserDto sender;
    private ShowUserDto recipient;
    private String message;
    private Boolean accepted;
}
