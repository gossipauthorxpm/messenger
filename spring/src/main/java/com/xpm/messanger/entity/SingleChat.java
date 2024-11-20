package com.xpm.messanger.entity;

import com.xpm.messanger.common.chat.IChat;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@With
public class SingleChat implements IChat {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "global-id-sequence")
    @SequenceGenerator(name = "global-id-sequence", sequenceName = "global_id_sequence", allocationSize = 1)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "chat_id")
    private List<Message> messages;

    @ManyToOne
    private User firstSender;
    @ManyToOne
    private User secondSender;


    @Override
    public List<Message> getAllMessages() {
        return this.messages;
    }

    @Override
    public List<User> getUsersChat() {
        return List.of(this.firstSender, this.secondSender);
    }

    @Override
    public void sendMessage(Message message) {
        this.messages.add(message);
    }

    @Override
    public void deleteMessage(Message message) {
        this.messages.remove(message);
    }
}
