package nkanton.gmail.com.usersystem.service;

import nkanton.gmail.com.usersystem.repository.AddressRepository;
import nkanton.gmail.com.usersystem.service.interfaces.AddressService;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {

    private AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }
}
