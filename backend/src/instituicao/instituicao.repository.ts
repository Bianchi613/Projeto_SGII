import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Instituicao } from './instituicao.model';
import { CreationAttributes } from 'sequelize';

export type InstituicaoInput = CreationAttributes<Instituicao>;

@Injectable()
export class InstituicaoRepository {
  constructor(
    @InjectModel(Instituicao)
    private readonly instituicaoModel: typeof Instituicao,
  ) {}

  async findAll(): Promise<Instituicao[]> {
    return this.instituicaoModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Instituicao | null> {
    return this.instituicaoModel.findByPk(id, { include: { all: true } });
  }

  async create(data: InstituicaoInput): Promise<Instituicao> {
    return this.instituicaoModel.create(data);
  }

  async update(
    instituicao: Instituicao,
    data: Partial<InstituicaoInput>,
  ): Promise<Instituicao> {
    return instituicao.update(data);
  }

  async delete(instituicao: Instituicao): Promise<void> {
    await instituicao.destroy();
  }
}
