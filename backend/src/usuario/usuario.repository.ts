// ✅ usuario.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreationAttributes } from 'sequelize';
import { Usuario } from './usuario.model';
import type { UsuarioCreateData } from './usuario.service';

@Injectable()
export class UsuarioRepository {
  constructor(
    @InjectModel(Usuario)
    private readonly usuarioModel: typeof Usuario,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Usuario | null> {
    return this.usuarioModel.findByPk(id, { include: { all: true } });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ where: { email } });
  }

  async create(data: UsuarioCreateData): Promise<Usuario> {
    return this.usuarioModel.create(data as CreationAttributes<Usuario>);
  }

  async update(
    usuario: Usuario,
    data: Partial<UsuarioCreateData>,
  ): Promise<Usuario> {
    return usuario.update(data);
  }

  async delete(usuario: Usuario): Promise<void> {
    await usuario.destroy();
  }
}
