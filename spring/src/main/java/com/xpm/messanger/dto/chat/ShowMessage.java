package com.xpm.messanger.dto.chat;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@With
public class ShowMessage {
    private Long id;
    private String content;
    private ShowUserInMessage sender;
    private boolean isRead;
    private Timestamp createdTime;
}
