package nkanton.gmail.com.usersystem.controller;

import nkanton.gmail.com.usersystem.model.dto.AddressDTO;
import nkanton.gmail.com.usersystem.service.interfaces.AddressService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/addresses")

public class AddressController {

    private AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/{id}")
    public AddressDTO getAddressById(@PathVariable Long id){
        return addressService.getById(id);
    }

    @PutMapping("/{id}")
    public void updateAddressById(@PathVariable Long id, @RequestBody AddressDTO address){
        address.setId(id);
        addressService.update(address);
    }

    @DeleteMapping("/{id}")
    public void deleteAddressById(@PathVariable Long id){
        addressService.delete(id);
    }
}
