package nkanton.gmail.com.usersystem.controller;

import nkanton.gmail.com.usersystem.model.dto.SearchDTO;
import nkanton.gmail.com.usersystem.model.dto.UserDTO;
import nkanton.gmail.com.usersystem.model.dto.UserRegisterDTO;
import nkanton.gmail.com.usersystem.service.interfaces.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
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
    @ResponseStatus(HttpStatus.CREATED)
    public void saveUser(@Valid @RequestBody UserRegisterDTO userDTO) {
        userDTO.setPassword(userDTO.getPassword());
        userService.save(userDTO);
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        userService.update(userDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.delete(id);
    }

    @GetMapping("/search")
    public List<UserDTO> searchUser(SearchDTO searchDTO){
        return userService.search(searchDTO);
    }
}
