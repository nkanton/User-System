package nkanton.gmail.com.usersystem.service;

import nkanton.gmail.com.usersystem.mapper.AddressMapper;
import nkanton.gmail.com.usersystem.model.dto.AddressDTO;
import nkanton.gmail.com.usersystem.repository.AddressRepository;
import nkanton.gmail.com.usersystem.service.interfaces.AddressService;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {

    private AddressRepository addressRepository;

    private AddressMapper addressMapper;

    public AddressServiceImpl(AddressRepository addressRepository, AddressMapper addressMapper) {
        this.addressRepository = addressRepository;
        this.addressMapper = addressMapper;
    }

    @Override
    public AddressDTO getById(Long id) {
        return addressRepository.findById(id).map(addressMapper::toDTO).get();
    }

    @Override
    public void update(AddressDTO addressDTO) {
        addressRepository.findById(addressDTO.getId()).ifPresent(address -> {
            address.setAddress(addressDTO.getAddress());
            address.setCity(addressDTO.getCity());
            address.setPostalCode(addressDTO.getPostalCode());
            address.setType(addressDTO.getType());
            addressRepository.save(address);
        });
    }

    @Override
    public void delete(Long id) {
        addressRepository.deleteById(id);
    }
}
