package com.xpm.messanger.mapper;


import com.xpm.messanger.dto.chat.ShowUserInMessage;
import com.xpm.messanger.dto.user.RegisterUserDto;
import com.xpm.messanger.dto.user.ShowUserDto;
import com.xpm.messanger.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;


@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface UserMapper {

    User registerToUser(RegisterUserDto userDto);
    ShowUserDto userToShowUser(User user);
}
