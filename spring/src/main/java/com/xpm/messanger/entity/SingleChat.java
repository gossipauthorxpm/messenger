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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "chat_id")
    private List<Message> messages;

    @ManyToOne
    private User sender;
    @ManyToOne
    private User recipient;


    @Override
    public List<Message> getAllMessages() {
        return this.messages;
    }

    @Override
    public void setAllMessages(List<Message> messages) {
        this.messages = messages;
    }

    @Override
    public List<User> getUsersChat() {
        return List.of(this.sender, this.recipient);
    }

    @Override
    public User getCreator() {
        return null;
    }

    @Override
    public Boolean isGroup() {
        return false;
    }

    @Override
    public String getNameChat() {
        return null;
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
