import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MovimentacaoChave } from './movimentacao-chaves.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class MovimentacaoChavesService {
  constructor(
    @InjectModel(MovimentacaoChave)
    private model: typeof MovimentacaoChave,
  ) {}

  create(data: CreationAttributes<MovimentacaoChave>) {
    return this.model.create(data);
  }

  findAll() {
    return this.model.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.model.findByPk(id, { include: { all: true } });
  }

  update(id: number, data: Partial<MovimentacaoChave>) {
    return this.model.update(data, { where: { id } });
  }

  remove(id: number) {
    return this.model.destroy({ where: { id } });
  }
}
