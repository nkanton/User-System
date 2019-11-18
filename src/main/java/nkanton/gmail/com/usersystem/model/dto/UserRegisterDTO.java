package nkanton.gmail.com.usersystem.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterDTO extends UserDTO {
    @Size(min = 6, max = 60)
    private String password;
}
