import { Address } from '../../address/address.entity';
import { Role } from '../../common/enums/role.enum';
import { User } from '../../users/users.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Wallet } from 'src/wallets/wallet.entity';

export default class CreateInitialData implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const usersRepository = dataSource.getRepository(User);
    const addressRepository = dataSource.getRepository(Address);

    await this.createUsers(usersRepository, addressRepository);
  }

  async createUsers(usersRepository, addressRepository) {
    const address1 = Address.createEntityInstance(
      '도로1',
      '도로1 앞 주택1',
      '11111',
    );

    const address2 = Address.createEntityInstance(
      '도로2',
      '도로2 앞 주택2',
      '22222',
    );

    const address3 = Address.createEntityInstance(
      '도로3',
      '도로3 앞 주택3',
      '33333',
    );

    const wallet1 = Wallet.createEntityInstance();
    const wallet2 = Wallet.createEntityInstance();

    await addressRepository.save(address1);
    await addressRepository.save(address2);
    await addressRepository.save(address3);

    const user1 = User.createEntityInstance(
      'test1@user.com',
      '$2b$10$BtSSeyl3q3JKRfxvgI.AJOiouUH6Uc3MjOliHkiQqCpnplg7kdRqC',
      'test user 1',
      '010-1111-1111',
      Role.User,
    );

    const user2 = User.createEntityInstance(
      'partner1@user.com',
      '$2b$10$BtSSeyl3q3JKRfxvgI.AJOiouUH6Uc3MjOliHkiQqCpnplg7kdRqC',
      'test partner 1',
      '010-2222-2222',
      Role.Partner,
    );

    const user3 = User.createEntityInstance(
      'admin1@user.com',
      '$2b$10$BtSSeyl3q3JKRfxvgI.AJOiouUH6Uc3MjOliHkiQqCpnplg7kdRqC',
      'test admin 1',
      '010-3333-3333',
      Role.Admin,
    );

    user1.address = address1;
    user2.address = address2;
    user3.address = address3;

    user1.wallet = wallet1;
    user2.wallet = wallet2;

    await usersRepository.save(user1);
    await usersRepository.save(user2);
    await usersRepository.save(user3);
  }
}
