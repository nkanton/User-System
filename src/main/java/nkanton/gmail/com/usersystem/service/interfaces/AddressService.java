package nkanton.gmail.com.usersystem.service.interfaces;

import nkanton.gmail.com.usersystem.model.dto.AddressDTO;

public interface AddressService {
    AddressDTO getById(Long id);

    void update(AddressDTO address);

    void delete(Long id);
}
