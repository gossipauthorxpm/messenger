package com.xpm.messanger.service;

import depends.common.LogMessage;
import depends.common.TypeLog;
import depends.common.TypeSender;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.protocol.types.Field;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoggerService {

    private final KafkaTemplate<String, LogMessage> kafkaTemplate;

    public void sendMessage(String message, TypeSender sender, TypeLog type) {
        LogMessage logMessage = new LogMessage(type, message, sender);
        this.kafkaTemplate.send("logs", logMessage);
    }

}
