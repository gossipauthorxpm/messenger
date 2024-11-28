package com.example.logger.entity;

import depends.common.LogMessage;
import depends.common.TypeLog;
import depends.common.TypeSender;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "logs")
public class Log extends LogMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private TypeLog level;
    private String message;
    private TypeSender sender;

}
