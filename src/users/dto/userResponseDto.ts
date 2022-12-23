export class UserResponseDto {
  email: string;

  name: string;

  phoneNumber: string;

  address: object;

  money: number;

  bizType: string;

  static EntityToDto(name, email, phoneNumber, address, money, bizType) {
    const user = new UserResponseDto();
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.address = address;
    user.money = money;
    user.bizType = bizType;

    return user;
  }
}
