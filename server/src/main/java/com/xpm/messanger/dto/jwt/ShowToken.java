package com.xpm.messanger.dto.jwt;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ShowToken {
    private String authToken;
    private String refreshToken;
}
