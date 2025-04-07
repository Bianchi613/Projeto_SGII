import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chave } from './chave.model';

@Injectable()
export class ChaveService {
  constructor(
    @InjectModel(Chave)
    private chaveModel: typeof Chave,
  ) {}

  async findAll(): Promise<Chave[]> {
    return this.chaveModel.findAll();
  }

  async findOne(id: number): Promise<Chave> {
    const chave = await this.chaveModel.findByPk(id);
    if (!chave) {
      throw new NotFoundException(`Chave com id ${id} não encontrada`);
    }
    return chave;
  }

  async create(data: Omit<Chave, 'id'>): Promise<Chave> {
    return this.chaveModel.create(data as any);
  }

  async update(id: number, data: Partial<Chave>): Promise<Chave> {
    const chave = await this.findOne(id);
    return chave.update(data);
  }

  async delete(id: number): Promise<{ success: boolean }> {
    const chave = await this.findOne(id);
    await chave.destroy();
    return { success: true };
  }
}
