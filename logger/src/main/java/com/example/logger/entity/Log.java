package com.example.logger.entity;

import com.example.logger.common.TypeLog;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "logs")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private TypeLog level;
    private String message;


//    private String stackTrace;

}
