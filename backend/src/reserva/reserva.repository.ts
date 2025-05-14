// ✅ reserva.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reserva } from './reserva.model';
import { CreationAttributes } from 'sequelize';

export type ReservaInput = CreationAttributes<Reserva>;

@Injectable()
export class ReservaRepository {
  constructor(
    @InjectModel(Reserva)
    private readonly reservaModel: typeof Reserva,
  ) {}

  async findAll(): Promise<Reserva[]> {
    return this.reservaModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Reserva | null> {
    return this.reservaModel.findByPk(id, { include: { all: true } });
  }

  async create(data: ReservaInput): Promise<Reserva> {
    return this.reservaModel.create(data);
  }

  async update(
    reserva: Reserva,
    data: Partial<ReservaInput>,
  ): Promise<Reserva> {
    return reserva.update(data);
  }

  async delete(reserva: Reserva): Promise<void> {
    await reserva.destroy();
  }
}
