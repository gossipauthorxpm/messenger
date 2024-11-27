package com.xpm.messanger.service;

import com.xpm.messanger.dto.friend.ShowFriendRequest;
import com.xpm.messanger.dto.user.ShowUserDto;
import com.xpm.messanger.entity.FriendRequest;
import com.xpm.messanger.entity.User;
import com.xpm.messanger.exceptions.ServiceException;
import com.xpm.messanger.mapper.FriendsRequestMapper;
import com.xpm.messanger.mapper.UserMapper;
import com.xpm.messanger.repository.FriendRequestRepository;
import jakarta.jws.soap.SOAPBinding;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Service
public class FriendRequestService {

    private FriendRequestRepository friendRequestRepository;
    private UserService userService;
    private FriendsRequestMapper friendsRequestMapper;
    private UserMapper userMapper;

    public List<ShowFriendRequest> getAllTakenRequests() {
        User currentUser = userService.getCurrentUser();
        return this.friendRequestRepository.findFriendRequestsByRecipient(currentUser).stream().map(this.friendsRequestMapper::toShowFriendRequest).toList();
    }

    public List<ShowFriendRequest> getAllSentRequests() {
        User currentUser = userService.getCurrentUser();
        return this.friendRequestRepository.findFriendRequestsBySender(currentUser).stream().map(this.friendsRequestMapper::toShowFriendRequest).toList();
    }

    // TODO SET UP UNIQUE FRIEND REQUEST
    @Transactional
    public void sendFriendRequest(String login, String message) {
        User currentUser = userService.getCurrentUser();
        User recipientUser = this.userService.findUserBy(login);
        this.friendRequestRepository.save(FriendRequest.builder()
                .sender(currentUser)
                .accepted(false)
                .message(message)
                .recipient(recipientUser)
                .build());
    }

    @Transactional
    public void acceptFriendRequest(Long idFriendRequest) {
        User currentUser = userService.getCurrentUser();
        Optional<FriendRequest> friendRequest = this.friendRequestRepository.findById(idFriendRequest);
        if (friendRequest.isEmpty()) throw new ServiceException("Friend request not found!");
        if (!friendRequest.get().getRecipient().equals(currentUser)) {
            throw new ServiceException("Access denied!", HttpStatus.FORBIDDEN);
        }
        friendRequest.get().setAccepted(true);
        this.friendRequestRepository.save(friendRequest.get());
    }

    @Transactional
    public void deleteFriendRequest(String login) {
        User user = this.userService.findUserBy(login);
        User currentUser = userService.getCurrentUser();
        this.friendRequestRepository.deleteFriendRequestBySenderAndRecipient(user, currentUser);
        this.friendRequestRepository.deleteFriendRequestBySenderAndRecipient(currentUser, user);
    }

    //  TODO ADD IF FOR CHECK USER ACCESS TO FRIEND CHAIN
    @Transactional
    public void deleteFriendRequest(Long idFriendRequest) {
        this.friendRequestRepository.deleteById(idFriendRequest);
    }

    public List<ShowUserDto> getAllShowFriendsForUser() {
        User user = userService.getCurrentUser();
        return searchFriendsForUser(user).stream().map(this.userMapper::userToShowUser).toList();
    }

    public List<User> getAllFriendsForUser(User user) {
        return searchFriendsForUser (user);
    }

    /**
    * Receives all friends of the transferred user for further processing. If data is sent through the controller,
    * you need to process them using a mapper {@link com.xpm.messanger.mapper.UserMapper}
    */
    public  List<User> searchFriendsForUser(User user) {
        Set<FriendRequest> friendRequestList = new HashSet<>();

        List<FriendRequest> friendRequestsBySender = this.friendRequestRepository.findFriendRequestsBySender(user);
        List<FriendRequest> friendRequestsByRecipient = this.friendRequestRepository.findFriendRequestsByRecipient(user);

        for (FriendRequest friendRequest : friendRequestsByRecipient) {
            if (friendRequest.getAccepted()) {
                friendRequestList.add(friendRequest);
            }
        }
        for (FriendRequest friendRequest : friendRequestsBySender) {
            if (friendRequest.getAccepted()) {
                friendRequestList.add(friendRequest);
            }
        }

        return friendRequestList.stream().map(showFriendRequest -> {
            if (showFriendRequest.getRecipient().getLogin().equals(user.getLogin()))
                return showFriendRequest.getSender();
            else return showFriendRequest.getRecipient();
        }).toList();
    }

}
