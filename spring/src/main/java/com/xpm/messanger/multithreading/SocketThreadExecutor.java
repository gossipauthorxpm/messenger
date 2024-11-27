package com.xpm.messanger.multithreading;

import com.xpm.messanger.common.multithreading.IThreadExecutor;
import com.xpm.messanger.entity.User;
import com.xpm.messanger.multithreading.threads.OnlineSocketThread;
import com.xpm.messanger.multithreading.types.SocketRecord;
import com.xpm.messanger.service.FriendRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;


@Slf4j
@Component
@RequiredArgsConstructor
public class SocketThreadExecutor implements IThreadExecutor {
    /**
     * User flows. Each thread is unique according to its user key. There cannot be two threads per user.
     */
    private Set<SocketRecord> records = new HashSet<>();

    private final FriendRequestService friendRequestService;
    private final SimpMessagingTemplate messagingTemplate;

    public void createAndRun(User user) {
        if (!this.checkUserInThreads(user)) {
            OnlineSocketThread thread = new OnlineSocketThread(this.friendRequestService, this.messagingTemplate, user);
            SocketRecord socketRecord = new SocketRecord(thread, user);
            socketRecord.thread().start();
            this.records.add(socketRecord);
        }
    }

    /**
     * Delete Thread. A refactor may be needed to simplify the implementation.
     * The goal of the refactor is to make one from two cycles.
     *
     * @param user {@link User}
     */
    public void deleteForUser(User user) {
        AtomicReference<Byte> flag = new AtomicReference<>((byte) 0);
        this.records.forEach(thread -> {
            if (Objects.equals(thread.user().getId(), user.getId())) {
                thread.thread().stopRunning();
                flag.set((byte) 1);
            }
        });
        if (flag.get() == 0) {
            throw new RuntimeException("Thread is already running. Not effect delete thread");
        }
        this.records = this.records.stream()
                .filter(thread -> !Objects.equals(thread.user().getId(), user.getId()))
                .collect(Collectors.toSet());
        log.info("Delete thread for user {}", user.getId());
    }


    /**
     * Check for a user in the thread, if he is present in the thread.
     * Then the thread should not be started
     *
     * @param user {@link User}
     */
    private boolean checkUserInThreads(User user) {
        AtomicReference<Byte> flag = new AtomicReference<>((byte) 0);
        this.records.forEach(thread -> {
            if (thread.user().getId().equals(user.getId())) flag.set((byte) 1);
        });
        return flag.get() == 1;
    }


}
