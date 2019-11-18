package nkanton.gmail.com.usersystem.mapper;


import nkanton.gmail.com.usersystem.model.User;
import nkanton.gmail.com.usersystem.model.dto.UserDTO;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toDTO(User user);

    User toEntity(UserDTO userDTO);
}
