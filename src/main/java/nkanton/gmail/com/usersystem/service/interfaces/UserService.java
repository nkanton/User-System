package nkanton.gmail.com.usersystem.service.interfaces;

import nkanton.gmail.com.usersystem.model.dto.UserDTO;
import nkanton.gmail.com.usersystem.model.dto.UserRegisterDTO;

public interface UserService {
    UserDTO getUserById(Long userId);

    void saveUser(UserDTO userDTO);

    void registerUser(UserRegisterDTO managedUserVM, String password);
}
