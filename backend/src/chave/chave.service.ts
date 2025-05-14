import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ChaveRepository } from './chave.repository';
import { Chave } from './chave.model';

@Injectable()
export class ChaveService {
  constructor(private readonly chaveRepository: ChaveRepository) {}

  async findAll(): Promise<Chave[]> {
    return this.chaveRepository.findAll();
  }

  async findOne(id: number): Promise<Chave> {
    const chave = await this.chaveRepository.findOne(id);
    if (!chave) {
      throw new NotFoundException(`Chave com ID ${id} não encontrada.`);
    }
    return chave;
  }

  async create(data: Omit<Chave, 'id'>): Promise<Chave> {
    try {
      return await this.chaveRepository.create(data as any); // Substituir por DTO depois
    } catch {
      throw new BadRequestException('Erro ao criar chave.');
    }
  }

  async update(id: number, data: Partial<Chave>): Promise<Chave> {
    const chave = await this.findOne(id);
    try {
      return await this.chaveRepository.update(chave, data);
    } catch {
      throw new BadRequestException('Erro ao atualizar chave.');
    }
  }

  async delete(id: number): Promise<void> {
    const chave = await this.findOne(id);
    try {
      await this.chaveRepository.delete(chave);
    } catch {
      throw new BadRequestException('Erro ao excluir chave.');
    }
  }
}
