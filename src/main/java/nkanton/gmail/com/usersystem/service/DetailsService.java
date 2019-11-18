package nkanton.gmail.com.usersystem.service;

import nkanton.gmail.com.usersystem.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Locale;


@Component
public class DetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public DetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //One authority for all users.
    private final static GrantedAuthority authority = new SimpleGrantedAuthority("USER");

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
        String lowercaseLogin = login.toLowerCase(Locale.ENGLISH);
        return userRepository.findUserByUserName(lowercaseLogin)
                .map(user -> {
                    return new org.springframework.security.core.userdetails.User(lowercaseLogin,
                            user.getPassword(),
                            Collections.singletonList(authority));
                })
                .orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the database"));
    }
}
