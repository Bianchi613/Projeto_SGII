// ✅ logs-uso.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { LogsUsoRepository, LogUsoInput } from './logs-uso.repository';
import { LogUso } from './logs-uso.model';

@Injectable()
export class LogsUsoService {
  constructor(private readonly repo: LogsUsoRepository) {}

  async findAll(): Promise<LogUso[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<LogUso> {
    const log = await this.repo.findOne(id);
    if (!log) {
      throw new NotFoundException(`Log com ID ${id} não encontrado.`);
    }
    return log;
  }

  async create(data: LogUsoInput): Promise<LogUso> {
    try {
      return await this.repo.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao criar log de uso.');
    }
  }

  async update(id: number, data: Partial<LogUsoInput>): Promise<LogUso> {
    const log = await this.findOne(id);
    try {
      return await this.repo.update(log, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao atualizar log.');
    }
  }

  async delete(id: number): Promise<void> {
    const log = await this.findOne(id);
    try {
      await this.repo.delete(log);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao excluir log.');
    }
  }
}
