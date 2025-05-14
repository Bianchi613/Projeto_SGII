// ✅ sala.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sala } from './sala.model';
import { CreationAttributes } from 'sequelize';

export type SalaInput = CreationAttributes<Sala>;

@Injectable()
export class SalaRepository {
  constructor(
    @InjectModel(Sala)
    private readonly salaModel: typeof Sala,
  ) {}

  async findAll(): Promise<Sala[]> {
    return this.salaModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Sala | null> {
    return this.salaModel.findByPk(id, { include: { all: true } });
  }

  async create(data: SalaInput): Promise<Sala> {
    return this.salaModel.create(data);
  }

  async update(sala: Sala, data: Partial<SalaInput>): Promise<Sala> {
    return sala.update(data);
  }

  async delete(sala: Sala): Promise<void> {
    await sala.destroy();
  }
}
