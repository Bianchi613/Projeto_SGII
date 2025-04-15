import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reserva } from './reserva.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class ReservaService {
  constructor(
    @InjectModel(Reserva)
    private reservaModel: typeof Reserva,
  ) {}

  create(data: CreationAttributes<Reserva>): Promise<Reserva> {
    return this.reservaModel.create(data);
  }

  findAll(): Promise<Reserva[]> {
    return this.reservaModel.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<Reserva | null> {
    return this.reservaModel.findByPk(id, { include: { all: true } });
  }

  update(id: number, data: Partial<Reserva>): Promise<[number]> {
    return this.reservaModel.update(data, { where: { id } });
  }

  remove(id: number): Promise<number> {
    return this.reservaModel.destroy({ where: { id } });
  }
}
