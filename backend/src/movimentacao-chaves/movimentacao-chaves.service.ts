// ✅ movimentacao-chaves.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  MovimentacaoChavesRepository,
  MovimentacaoChaveInput,
} from './movimentacao-chaves.repository';
import { MovimentacaoChave } from './movimentacao-chaves.model';

@Injectable()
export class MovimentacaoChavesService {
  constructor(private readonly repo: MovimentacaoChavesRepository) {}

  async findAll(): Promise<MovimentacaoChave[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<MovimentacaoChave> {
    const registro = await this.repo.findOne(id);
    if (!registro) {
      throw new NotFoundException(`Movimentação com ID ${id} não encontrada.`);
    }
    return registro;
  }

  async create(data: MovimentacaoChaveInput): Promise<MovimentacaoChave> {
    try {
      return await this.repo.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao criar movimentação.');
    }
  }

  async update(
    id: number,
    data: Partial<MovimentacaoChaveInput>,
  ): Promise<MovimentacaoChave> {
    const registro = await this.findOne(id);
    try {
      return await this.repo.update(registro, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao atualizar movimentação.');
    }
  }

  async delete(id: number): Promise<void> {
    const registro = await this.findOne(id);
    try {
      await this.repo.delete(registro);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao excluir movimentação.');
    }
  }
}
