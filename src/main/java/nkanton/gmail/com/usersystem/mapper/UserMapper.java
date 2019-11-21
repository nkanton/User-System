package nkanton.gmail.com.usersystem.mapper;


import nkanton.gmail.com.usersystem.model.User;
import nkanton.gmail.com.usersystem.model.dto.UserDTO;
import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring", uses = AddressMapper.class)
public interface UserMapper {

    UserDTO toDTO(User user);

    List<UserDTO> toDTO(List<User> user);

    User toEntity(UserDTO userDTO);
}
