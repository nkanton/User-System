package nkanton.gmail.com.usersystem.mapper;

import nkanton.gmail.com.usersystem.model.Address;
import nkanton.gmail.com.usersystem.model.dto.AddressDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface AddressMapper {

    @Mapping(target = "userId", source = "user.id")
    AddressDTO toDTO(Address address);
    @Mapping(target = "user.id", source = "userId")
    Address toEntity(AddressDTO addressDTO);
}
