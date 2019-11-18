package nkanton.gmail.com.usersystem.service;

import nkanton.gmail.com.usersystem.mapper.UserMapper;
import nkanton.gmail.com.usersystem.model.User;
import nkanton.gmail.com.usersystem.model.dto.UserDTO;
import nkanton.gmail.com.usersystem.repository.UserRepository;
import nkanton.gmail.com.usersystem.service.interfaces.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId).get();
        return userMapper.toDTO(user);
    }

    @Override
    public void saveUser(UserDTO userDTO) {
        userRepository.save(userMapper.toEntity(userDTO));
    }
}
