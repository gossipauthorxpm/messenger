package com.xpm.messanger.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.xpm.messanger.http.HttpResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;


@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

    @Value("${cors.name}")
    private String corsName;

    @ResponseBody
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setHeader("Access-Control-Allow-Origin", this.corsName);
//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
        response.getWriter().write(ow.writeValueAsString(
                        new HttpResponse(
                                HttpStatus.FORBIDDEN,
                                authException.getMessage(),
                                authException.toString())
                )
        );
    }
}
