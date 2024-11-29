package com.example.logger.service;

import com.example.logger.entity.Log;
import com.example.logger.repository.LogRepository;
import depends.common.LogMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageListener {

    private final LogRepository logRepository;

    @KafkaListener(topics = "logs", groupId = "logger")
    @Transactional
    public void listenLogMessages(LogMessage message) {
        this.logRepository.save(Log.builder().message(message.getMessage()).level(message.getLevel()).sender(message.getSender()).build());
    }

}
