package com.xpm.messanger.multithreading.types;

import com.xpm.messanger.entity.User;
import com.xpm.messanger.multithreading.threads.OnlineSocketThread;


public record SocketRecord(OnlineSocketThread thread, User user) {

}
