package com.xpm.messanger.repository;

import com.xpm.messanger.entity.FriendRequest;
import com.xpm.messanger.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface FriendRequestRepository extends CrudRepository<FriendRequest, Long> {
    List<FriendRequest> findFriendRequestsByRecipient(User recipient);

    List<FriendRequest> findFriendRequestsBySender(User sender);

    void deleteFriendRequestBySenderOrRecipient(User sender, User recipient);
    void deleteFriendRequestBySenderAndRecipient(User sender, User recipient);
}
