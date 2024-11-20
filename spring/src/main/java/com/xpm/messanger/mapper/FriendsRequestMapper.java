package com.xpm.messanger.mapper;

import com.xpm.messanger.dto.friend.ShowFriendRequest;
import com.xpm.messanger.entity.FriendRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface FriendsRequestMapper {

    @Mapping(target = "sender", source = "sender")
    @Mapping(target = "recipient", source = "recipient")
    ShowFriendRequest toShowFriendRequest(FriendRequest friendRequest);

}
