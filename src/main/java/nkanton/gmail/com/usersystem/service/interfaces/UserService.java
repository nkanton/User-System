package nkanton.gmail.com.usersystem.service.interfaces;

import nkanton.gmail.com.usersystem.model.dto.UserDTO;

public interface UserService {
    UserDTO getUserById(Long userId);

    void saveUser(UserDTO userDTO);
}
