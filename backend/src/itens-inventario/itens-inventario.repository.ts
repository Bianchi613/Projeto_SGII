// ✅ item-inventario.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemInventario } from './itens-inventario.model';
import { CreationAttributes } from 'sequelize';

export type ItemInventarioInput = CreationAttributes<ItemInventario>;

@Injectable()
export class ItemInventarioRepository {
  constructor(
    @InjectModel(ItemInventario)
    private readonly itemModel: typeof ItemInventario,
  ) {}

  async findAll(): Promise<ItemInventario[]> {
    return this.itemModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<ItemInventario | null> {
    return this.itemModel.findByPk(id, { include: { all: true } });
  }

  async create(data: ItemInventarioInput): Promise<ItemInventario> {
    return this.itemModel.create(data);
  }

  async update(
    item: ItemInventario,
    data: Partial<ItemInventarioInput>,
  ): Promise<ItemInventario> {
    return item.update(data);
  }

  async delete(item: ItemInventario): Promise<void> {
    await item.destroy();
  }
}
