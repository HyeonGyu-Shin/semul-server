import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/entities/users.entity';
import { Wallet } from 'src/entities/wallet.entity';
import { WalletsRepository } from '../repository/wallets.repository';

@Injectable()
export class WalletsService {
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async createWallet(user: User) {
    const foundWallet = await this.walletsRepository.findOne(user.id);

    if (foundWallet) throw new BadRequestException('이미 지갑이 있습니다!');
    const wallet = Wallet.from(0);
    wallet.user = user;

    const newWallet = await this.walletsRepository.create(wallet);

    if (!newWallet)
      throw new InternalServerErrorException('지갑이 생성되지 않았습니다!');

    return newWallet;
  }

  async chargeMoney(user: User, money: number) {
    const wallet = await this.walletsRepository.findOne(user.id);

    if (!wallet) throw new BadRequestException('지갑을 먼저 생성해주세요!');

    const total = wallet.money + money;

    await this.walletsRepository.update(user.id, total);

    const foundWallet = await this.walletsRepository.findOne(user.id);

    if (foundWallet.money !== total)
      throw new InternalServerErrorException('서버 에러');

    return foundWallet;
  }
}
