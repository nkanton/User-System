package nkanton.gmail.com.usersystem.repository;

import nkanton.gmail.com.usersystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUserName(String toLowerCase);

    Optional<User> findUserByEmail(String email);

    @Query("select u from User u where " +
            "(:firstName is null or u.firstName like :firstName%)" +
            "and (:lastName is null or u.lastName like :lastName%)" +
            "and (:userName is null or u.userName like :userName%)" +
            "and (:email is null or u.email like :email%)" +
            "and (:phoneNumber is null or cast(u.phoneNumber as text) like :phoneNumber%)")
    List<User> findByParams(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("userName") String userName,
            @Param("email") String email,
            @Param("phoneNumber") String phoneNumber);
}
