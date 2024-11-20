package com.xpm.messanger.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@With
@AllArgsConstructor
@RequiredArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;
    private String content;
    @ManyToOne
    @JoinColumn
    private User sender;
    @Column(nullable = false)
    private boolean isRead = false;
    private Timestamp createdTime = new Timestamp(System.currentTimeMillis());

}
