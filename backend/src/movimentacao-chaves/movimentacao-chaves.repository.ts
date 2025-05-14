// ✅ movimentacao-chaves.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MovimentacaoChave } from './movimentacao-chaves.model';
import { CreationAttributes } from 'sequelize';

export type MovimentacaoChaveInput = CreationAttributes<MovimentacaoChave>;

@Injectable()
export class MovimentacaoChavesRepository {
  constructor(
    @InjectModel(MovimentacaoChave)
    private readonly model: typeof MovimentacaoChave,
  ) {}

  async findAll(): Promise<MovimentacaoChave[]> {
    return this.model.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<MovimentacaoChave | null> {
    return this.model.findByPk(id, { include: { all: true } });
  }

  async create(data: MovimentacaoChaveInput): Promise<MovimentacaoChave> {
    return this.model.create(data);
  }

  async update(
    registro: MovimentacaoChave,
    data: Partial<MovimentacaoChaveInput>,
  ): Promise<MovimentacaoChave> {
    return registro.update(data);
  }

  async delete(registro: MovimentacaoChave): Promise<void> {
    await registro.destroy();
  }
}
