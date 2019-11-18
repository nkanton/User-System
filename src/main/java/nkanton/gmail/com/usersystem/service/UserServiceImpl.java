package nkanton.gmail.com.usersystem.service;

import nkanton.gmail.com.usersystem.exception.EmailAlreadyUsedException;
import nkanton.gmail.com.usersystem.exception.UsernameAlreadyUsedException;
import nkanton.gmail.com.usersystem.mapper.UserMapper;
import nkanton.gmail.com.usersystem.model.User;
import nkanton.gmail.com.usersystem.model.dto.UserDTO;
import nkanton.gmail.com.usersystem.model.dto.UserRegisterDTO;
import nkanton.gmail.com.usersystem.repository.UserRepository;
import nkanton.gmail.com.usersystem.service.interfaces.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
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

    @Override
    public void registerUser(UserRegisterDTO userRegisterDTO, String password) {
        userRepository.findUserByUserName(userRegisterDTO.getUserName().toLowerCase()).ifPresent(existingUser -> {
            throw new UsernameAlreadyUsedException();
        });
        userRepository.findUserByEmail(userRegisterDTO.getEmail()).ifPresent(existingUser -> {
            throw new EmailAlreadyUsedException();
        });
        User newUser = new User();
        String encryptedPassword = passwordEncoder.encode(password);
        newUser.setUserName(userRegisterDTO.getUserName().toLowerCase());
        newUser.setFirstName(userRegisterDTO.getFirstName());
        newUser.setLastName(userRegisterDTO.getLastName());
        newUser.setPhoneNumber(userRegisterDTO.getPhoneNumber());
        newUser.setPassword(encryptedPassword);
        newUser.setEmail(userRegisterDTO.getEmail().toLowerCase());
        userRepository.save(newUser);
    }
}
