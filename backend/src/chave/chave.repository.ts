import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chave } from './chave.model';

@Injectable()
export class ChaveRepository {
  constructor(
    @InjectModel(Chave)
    private readonly chaveModel: typeof Chave,
  ) {}

  async findAll(): Promise<Chave[]> {
    return this.chaveModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Chave | null> {
    return this.chaveModel.findByPk(id, { include: { all: true } });
  }

  async create(data: Omit<Chave, 'id'>): Promise<Chave> {
    return this.chaveModel.create(data as any); // ou crie DTO para evitar o "any"
  }

  async update(chave: Chave, data: Partial<Chave>): Promise<Chave> {
    return chave.update(data);
  }

  async delete(chave: Chave): Promise<void> {
    await chave.destroy();
  }
}
