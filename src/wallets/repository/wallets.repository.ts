import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from 'src/entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletsRepository {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletsRepository: Repository<Wallet>,
  ) {}

  async create(walletInfo: Wallet) {
    return await this.walletsRepository.save(walletInfo);
  }

  async findOne(userId: string) {
    return await this.walletsRepository
      .createQueryBuilder()
      .select('*')
      .from('wallet', 'w')
      .where('w.userId = :id', { id: userId })
      .getRawOne();
  }

  async update(userId: string, money: number) {
    return await this.walletsRepository
      .createQueryBuilder()
      .update('wallet')
      .set({ money: money })
      .where('userId = :id', { id: userId })
      .execute();
  }
}
