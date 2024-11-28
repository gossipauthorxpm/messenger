package com.xpm.messanger.dto.socket;

import com.xpm.messanger.common.user.UserActive;
import lombok.Getter;
import lombok.Setter;

import java.net.Socket;

@Getter
@Setter
public class SocketSetUserActive {
    private UserActive userActive;
}
