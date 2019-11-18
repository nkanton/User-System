package nkanton.gmail.com.usersystem.controller;

import nkanton.gmail.com.usersystem.model.dto.UserDTO;
import nkanton.gmail.com.usersystem.service.interfaces.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public void saveUser(UserDTO userDTO){
        userService.saveUser(userDTO);
    }
}
