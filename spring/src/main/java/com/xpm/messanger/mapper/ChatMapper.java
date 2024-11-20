package com.xpm.messanger.mapper;

import com.xpm.messanger.dto.chat.CreateMessageDto;
import com.xpm.messanger.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;


@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ChatMapper {

//    SingleChat createSingleChatToEntity(CreateSingleChatDto singleChat);
        Message createMessageToEntity(CreateMessageDto message);
}
