// ✅ item-inventario.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ItemInventarioRepository,
  ItemInventarioInput,
} from './itens-inventario.repository';
import { ItemInventario } from './itens-inventario.model';

@Injectable()
export class ItemInventarioService {
  constructor(private readonly repo: ItemInventarioRepository) {}

  async findAll(): Promise<ItemInventario[]> {
    return this.repo.findAll();
  }

  async findOne(id: number): Promise<ItemInventario> {
    const item = await this.repo.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item com ID ${id} não encontrado.`);
    }
    return item;
  }

  async create(data: ItemInventarioInput): Promise<ItemInventario> {
    try {
      return await this.repo.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao criar item de inventário.');
    }
  }

  async update(
    id: number,
    data: Partial<ItemInventarioInput>,
  ): Promise<ItemInventario> {
    const item = await this.findOne(id);
    try {
      return await this.repo.update(item, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao atualizar item.');
    }
  }

  async delete(id: number): Promise<void> {
    const item = await this.findOne(id);
    try {
      await this.repo.delete(item);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao excluir item.');
    }
  }
}
