package com.xpm.messanger.repository;

import com.xpm.messanger.entity.User;
import jakarta.jws.soap.SOAPBinding;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findUserByLogin(String login);

    Optional<User> findUserByEmail(String email);

    boolean existsByLogin(String login);
    boolean existsByEmail(String email);

}
