package nkanton.gmail.com.usersystem.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {
    private Long id;
    private String type;
    private String address;
    private String city;
    private Integer postalCode;
    private Long userId;
}

