import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Instituicao } from './instituicao.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class InstituicaoService {
  constructor(
    @InjectModel(Instituicao)
    private instituicaoModel: typeof Instituicao,
  ) {}

  create(data: CreationAttributes<Instituicao>): Promise<Instituicao> {
    return this.instituicaoModel.create(data);
  }

  findAll(): Promise<Instituicao[]> {
    return this.instituicaoModel.findAll();
  }

  findOne(id: number): Promise<Instituicao | null> {
    return this.instituicaoModel.findByPk(id);
  }

  update(id: number, data: Partial<Instituicao>): Promise<[number]> {
    return this.instituicaoModel.update(data, { where: { id } });
  }

  remove(id: number): Promise<number> {
    return this.instituicaoModel.destroy({ where: { id } });
  }
}
