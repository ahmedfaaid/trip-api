import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  date_of_birth: Date;
  occupation: string;
  gender: string;
  address: CreateAddressDto;
}
