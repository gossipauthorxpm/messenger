package com.xpm.messanger.entity;

import com.xpm.messanger.common.user.UserActive;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@With
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String login;
    private String password;
    @Column(unique = true)
    private String email;

    private String name;
    private String surname;
    private String thirdname;
    /** Current user action. Use, for example, to display "Writing a message" */
    private UserActive active;
    private Boolean isOnline;

    @Column(unique = true)
    private String phone;

    private Timestamp createdTime = new Timestamp(System.currentTimeMillis());

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return this.login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
