import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ItemInventario } from './itens-inventario.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class ItensInventarioService {
  constructor(
    @InjectModel(ItemInventario)
    private model: typeof ItemInventario,
  ) {}

  create(data: CreationAttributes<ItemInventario>): Promise<ItemInventario> {
    return this.model.create(data);
  }

  findAll(): Promise<ItemInventario[]> {
    return this.model.findAll({ include: { all: true } });
  }

  findOne(id: number): Promise<ItemInventario | null> {
    return this.model.findByPk(id, { include: { all: true } });
  }

  update(id: number, data: Partial<ItemInventario>): Promise<[number]> {
    return this.model.update(data, { where: { id } });
  }

  remove(id: number): Promise<number> {
    return this.model.destroy({ where: { id } });
  }
}
