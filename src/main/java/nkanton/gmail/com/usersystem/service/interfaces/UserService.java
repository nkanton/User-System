package nkanton.gmail.com.usersystem.service.interfaces;

import nkanton.gmail.com.usersystem.model.dto.SearchDTO;
import nkanton.gmail.com.usersystem.model.dto.UserDTO;
import nkanton.gmail.com.usersystem.model.dto.UserRegisterDTO;

import java.util.List;

public interface UserService {
    UserDTO getUserById(Long userId);

    void save(UserRegisterDTO userDTO);

    void registerUser(UserRegisterDTO userRegisterDTO);

    UserDTO getCurrentUser();

    void update(UserDTO userDTO);

    void delete(Long id);

    List<UserDTO> search(SearchDTO searchDTO);
}
