// ✅ sala.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SalaRepository, SalaInput } from './sala.repository';
import { Sala } from './sala.model';

@Injectable()
export class SalaService {
  constructor(private readonly salaRepository: SalaRepository) {}

  async findAll(): Promise<Sala[]> {
    return this.salaRepository.findAll();
  }

  async findOne(id: number): Promise<Sala> {
    const sala = await this.salaRepository.findOne(id);
    if (!sala) {
      throw new NotFoundException(`Sala com ID ${id} não encontrada.`);
    }
    return sala;
  }

  async create(data: SalaInput): Promise<Sala> {
    try {
      return await this.salaRepository.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao criar sala.');
    }
  }

  async update(id: number, data: Partial<SalaInput>): Promise<Sala> {
    const sala = await this.findOne(id);
    try {
      return await this.salaRepository.update(sala, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao atualizar sala.');
    }
  }

  async delete(id: number): Promise<void> {
    const sala = await this.findOne(id);
    try {
      await this.salaRepository.delete(sala);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao excluir sala.');
    }
  }
}
