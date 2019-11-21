package nkanton.gmail.com.usersystem.controller;

import nkanton.gmail.com.usersystem.config.JWTFilter;
import nkanton.gmail.com.usersystem.config.TokenProvider;
import nkanton.gmail.com.usersystem.model.dto.JWTokenDTO;
import nkanton.gmail.com.usersystem.model.dto.LoginDTO;
import nkanton.gmail.com.usersystem.model.dto.UserDTO;
import nkanton.gmail.com.usersystem.model.dto.UserRegisterDTO;
import nkanton.gmail.com.usersystem.service.interfaces.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class AccountController {

    private UserService userService;
    private final TokenProvider tokenProvider;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public AccountController(UserService userService, TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerUser(@Valid @RequestBody UserRegisterDTO userRegisterDTO) {

        userService.registerUser(userRegisterDTO);
    }

    @CrossOrigin
    @PostMapping("/authenticate")
    public ResponseEntity<JWTokenDTO> authorize(@Valid @RequestBody LoginDTO loginDto) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        boolean rememberMe = (loginDto.getRememberMe() == null) ? false : loginDto.getRememberMe();
        String jwt = tokenProvider.createToken(authentication, rememberMe);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        return new ResponseEntity<>(new JWTokenDTO(jwt), httpHeaders, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/account")
    public UserDTO getAccount() {
        return userService.getCurrentUser();
    }
}
