package nkanton.gmail.com.usersystem.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nkanton.gmail.com.usersystem.model.Address;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;

    @Size(max = 60)
    private String firstName;

    @Size(max = 60)
    private String lastName;

    @NotBlank
    @Pattern(regexp = "^[_.@A-Za-z0-9-]*$")
    @Size(min = 1, max = 50)
    private String userName;

    private Integer phoneNumber;

    @Email
    @Size(min = 5, max = 254)
    private String email;

    private List<AddressDTO> addresses;
}
