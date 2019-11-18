package nkanton.gmail.com.usersystem.repository;

import nkanton.gmail.com.usersystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findUserByUserName(String toLowerCase);

    Optional<User> findUserByEmail(String email);
}
