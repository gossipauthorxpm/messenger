package com.xpm.messanger.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Setter
@Getter
@AllArgsConstructor
@Builder
@RequiredArgsConstructor
public class FriendRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User sender;
    @ManyToOne
    private User recipient;

    private String message;
    private Boolean accepted;

    private Timestamp createdTime = new Timestamp(System.currentTimeMillis());

}
