package com.xpm.messanger.common.multithreading;

import com.xpm.messanger.entity.User;

public interface IThreadExecutor {
    void createAndRun(User user);

    void deleteForUser(User user);
}
