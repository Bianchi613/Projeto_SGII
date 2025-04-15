import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LogUso } from './logs-uso.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class LogsUsoService {
  constructor(
    @InjectModel(LogUso)
    private model: typeof LogUso,
  ) {}

  create(data: CreationAttributes<LogUso>): Promise<LogUso> {
    return this.model.create(data);
  }

  findAll(): Promise<LogUso[]> {
    return this.model.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<LogUso | null> {
    return this.model.findByPk(id, { include: { all: true } });
  }

  remove(id: number): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
