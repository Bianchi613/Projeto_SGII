import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreationAttributes } from 'sequelize';
import { Chave } from './chave.model';

export type ChaveInput = {
  codigo_identificador: string;
  sala_id: number;
  disponivel?: boolean;
  observacoes?: string;
};

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

  async create(data: ChaveInput): Promise<Chave> {
    return this.chaveModel.create(data as CreationAttributes<Chave>);
  }

  async update(chave: Chave, data: Partial<ChaveInput>): Promise<Chave> {
    return chave.update(data);
  }

  async delete(chave: Chave): Promise<void> {
    await chave.destroy();
  }
}
