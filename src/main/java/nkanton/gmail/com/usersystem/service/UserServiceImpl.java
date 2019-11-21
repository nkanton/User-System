package nkanton.gmail.com.usersystem.service;

import nkanton.gmail.com.usersystem.exception.EmailAlreadyUsedException;
import nkanton.gmail.com.usersystem.exception.UsernameAlreadyUsedException;
import nkanton.gmail.com.usersystem.mapper.UserMapper;
import nkanton.gmail.com.usersystem.model.User;
import nkanton.gmail.com.usersystem.model.dto.SearchDTO;
import nkanton.gmail.com.usersystem.model.dto.UserDTO;
import nkanton.gmail.com.usersystem.model.dto.UserRegisterDTO;
import nkanton.gmail.com.usersystem.repository.UserRepository;
import nkanton.gmail.com.usersystem.service.interfaces.UserService;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public void save(UserRegisterDTO userDTO) {
        registerUser(userDTO);
    }

    @Override
    public void registerUser(UserRegisterDTO userRegisterDTO) {
        userRepository.findUserByUserName(userRegisterDTO.getUserName().toLowerCase()).ifPresent(existingUser -> {
            throw new UsernameAlreadyUsedException();
        });
        userRepository.findUserByEmail(userRegisterDTO.getEmail()).ifPresent(existingUser -> {
            throw new EmailAlreadyUsedException();
        });
        String encryptedPassword = passwordEncoder.encode(userRegisterDTO.getPassword());

        User user = userMapper.toEntity(userRegisterDTO);
        user.setUserName(userRegisterDTO.getUserName().toLowerCase());
        user.setPassword(encryptedPassword);
        user.setEmail(userRegisterDTO.getEmail().toLowerCase());
        if (user.getAddresses() != null) {
            user.getAddresses().forEach(address -> address.setUser(user));
        }

        userRepository.save(user);
    }

    @Override
    public UserDTO getCurrentUser() {
        return getCurrentUserLogin().flatMap(userRepository::findUserByUserName).map(userMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("User could not be found"));
    }

    @Override
    public void update(UserDTO userDTO) {
        userRepository.findById(userDTO.getId()).ifPresent(user -> {
            user.setEmail(userDTO.getEmail());
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setPhoneNumber(userDTO.getPhoneNumber());
            user.setUserName(userDTO.getUserName());
            userRepository.save(user);
        });
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<UserDTO> search(SearchDTO searchDTO) {
        String phoneNumber = searchDTO.getPhoneNumber() == null ? null : searchDTO.getPhoneNumber().toString();
        List<User> byParams = userRepository.findByParams(searchDTO.getFirstName(), searchDTO.getLastName(), searchDTO.getUserName(), searchDTO.getEmail(), phoneNumber);
        return userMapper.toDTO(byParams);
    }

    public static Optional<String> getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
                .map(authentication -> {
                    if (authentication.getPrincipal() instanceof UserDetails) {
                        UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
                        return springSecurityUser.getUsername();
                    } else if (authentication.getPrincipal() instanceof String) {
                        return (String) authentication.getPrincipal();
                    }
                    return null;
                });
    }
}
