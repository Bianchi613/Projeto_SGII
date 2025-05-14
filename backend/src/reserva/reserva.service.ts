// ✅ reserva.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ReservaRepository, ReservaInput } from './reserva.repository';
import { Reserva } from './reserva.model';

@Injectable()
export class ReservaService {
  constructor(private readonly reservaRepository: ReservaRepository) {}

  async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.findAll();
  }

  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne(id);
    if (!reserva) {
      throw new NotFoundException(`Reserva com ID ${id} não encontrada.`);
    }
    return reserva;
  }

  async create(data: ReservaInput): Promise<Reserva> {
    try {
      return await this.reservaRepository.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao criar reserva.');
    }
  }

  async update(id: number, data: Partial<ReservaInput>): Promise<Reserva> {
    const reserva = await this.findOne(id);
    try {
      return await this.reservaRepository.update(reserva, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao atualizar reserva.');
    }
  }

  async delete(id: number): Promise<void> {
    const reserva = await this.findOne(id);
    try {
      await this.reservaRepository.delete(reserva);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao excluir reserva.');
    }
  }
}
