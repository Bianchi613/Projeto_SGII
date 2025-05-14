// ✅ usuario.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario.model';

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

  async create(data: any): Promise<Usuario> {
    return this.usuarioModel.create(data);
  }

  async update(usuario: Usuario, data: any): Promise<Usuario> {
    return usuario.update(data);
  }

  async delete(usuario: Usuario): Promise<void> {
    await usuario.destroy();
  }
}
