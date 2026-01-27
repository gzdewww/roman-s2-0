package com.romans.app.service.mapper;

import com.romans.app.dto.request.AddAddressRequestDto;
import com.romans.app.dto.response.AddressDto;
import com.romans.app.model.Address;

public class AddressMapper {
  public static AddressDto toDto(Address address) {
    if (address == null) {
      return null;
    }
    return AddressDto.builder()
        .id(address.getId())
        .street(address.getStreet())
        .building(address.getBuilding())
        .apartment(address.getApartment())
        .floor(address.getFloor())
        .entrance(address.getEntrance())
        .comment(address.getComment())
        .build();
  }

  public static Address toEntity(AddAddressRequestDto addressDto) {
    if (addressDto == null) {
      return null;
    }
    return Address.builder()
        .street(addressDto.getStreet())
        .building(addressDto.getBuilding())
        .apartment(addressDto.getApartment())
        .floor(addressDto.getFloor())
        .entrance(addressDto.getEntrance())
        .comment(addressDto.getComment())
        .build();
  }

  public static Address toEntity(AddressDto addressDto) {
    if (addressDto == null) {
      return null;
    }
    return Address.builder()
        .id(addressDto.getId())
        .street(addressDto.getStreet())
        .building(addressDto.getBuilding())
        .apartment(addressDto.getApartment())
        .floor(addressDto.getFloor())
        .entrance(addressDto.getEntrance())
        .comment(addressDto.getComment())
        .build();
  }
}
