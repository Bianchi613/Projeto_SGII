// ✅ logs-uso.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LogUso } from './logs-uso.model';
import { CreationAttributes } from 'sequelize';

export type LogUsoInput = CreationAttributes<LogUso>;

@Injectable()
export class LogsUsoRepository {
  constructor(
    @InjectModel(LogUso)
    private readonly logModel: typeof LogUso,
  ) {}

  async findAll(): Promise<LogUso[]> {
    return this.logModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<LogUso | null> {
    return this.logModel.findByPk(id, { include: { all: true } });
  }

  async create(data: LogUsoInput): Promise<LogUso> {
    return this.logModel.create(data);
  }

  async update(log: LogUso, data: Partial<LogUsoInput>): Promise<LogUso> {
    return log.update(data);
  }

  async delete(log: LogUso): Promise<void> {
    await log.destroy();
  }
}
