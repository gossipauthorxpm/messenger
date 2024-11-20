package com.xpm.messanger.entity;

import com.xpm.messanger.common.chat.IChat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@With
@AllArgsConstructor
@RequiredArgsConstructor
public class GroupChat implements IChat {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "global-id-sequence")
    @SequenceGenerator(name = "global-id-sequence", sequenceName = "global_id_sequence", allocationSize = 1)
    private Long id;
    @NotBlank
    private String name;
    @ManyToOne
    private User creator;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "group_chat_id")
    private List<Message> messages;
    @OneToMany
    private List<User> users;

    public void addUser(User user) {
        users.add(user);
    }

    public void removeUser(User user) {
        users.remove(user);
    }

    public boolean isMessageExists(Message message) {
        for (Message m : messages) {
            if (m.equals(message)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Message> getAllMessages() {
        return this.messages;
    }

    @Override
    public List<User> getUsersChat() {
        List<User> allUsersChat = this.users;
        if(allUsersChat == null) {return null;}
        allUsersChat.add(this.creator);
        return allUsersChat;
    }

    @Override
    public Boolean isGroup() {
        return true;
    }

    @Override
    public String getNameChat() {
        return this.name;
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
