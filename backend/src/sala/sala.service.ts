// src/sala/sala.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sala } from './sala.model';

@Injectable()
export class SalaService {
  constructor(
    @InjectModel(Sala)
    private readonly salaModel: typeof Sala,
  ) {}

  async findAll(): Promise<Sala[]> {
    return this.salaModel.findAll();
  }

  async findOne(id: number): Promise<Sala> {
    const sala = await this.salaModel.findByPk(id);
    if (!sala) {
      throw new NotFoundException(`Sala com id ${id} não encontrada`);
    }
    return sala;
  }

  async create(data: Omit<Sala, 'id'>): Promise<Sala> {
    return this.salaModel.create(data as any);
  }

  async update(id: number, data: Partial<Sala>): Promise<Sala> {
    const sala = await this.findOne(id);
    return sala.update(data);
  }

  async delete(id: number): Promise<{ success: boolean }> {
    const sala = await this.findOne(id);
    await sala.destroy();
    return { success: true };
  }
}
