package nkanton.gmail.com.usersystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
//@Table(name = "address", schema = "postgres")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String address;
    private String city;
    private Integer postalCode;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}

