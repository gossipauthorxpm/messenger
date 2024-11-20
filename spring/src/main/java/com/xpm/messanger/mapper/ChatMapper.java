package com.xpm.messanger.mapper;

import com.xpm.messanger.common.chat.IChat;
import com.xpm.messanger.dto.chat.CreateMessageDto;
import com.xpm.messanger.dto.chat.ShowChatDto;
import com.xpm.messanger.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;


@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ChatMapper {

    @Mapping(target = "usersChat", source = "usersChat")
    @Mapping(target = "messages", source = "allMessages")
    @Mapping(target = "id", source = "id")
    @Mapping(target = "isGroup", source = "group")
    @Mapping(target = "creator", source = "creator")
    ShowChatDto toShowChatDto(IChat chat);
}
