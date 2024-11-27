package com.xpm.messanger.mapper;

import com.xpm.messanger.dto.chat.ShowMessage;
import com.xpm.messanger.dto.chat.ShowUserInMessage;
import com.xpm.messanger.entity.Message;
import com.xpm.messanger.entity.User;
import org.mapstruct.*;


@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface MessageMapper {

    @Mapping(target = "sender", source = "sender")
    ShowMessage toShowMessage(Message message);
}
