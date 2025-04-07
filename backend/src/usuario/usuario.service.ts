import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario)
    private readonly usuarioModel: typeof Usuario,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.findAll();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioModel.findByPk(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findOne({ where: { email } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }
    return usuario;
  }

  async create(data: CreationAttributes<Usuario>): Promise<Usuario> {
    return this.usuarioModel.create(data);
  }

  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.findOne(id);
    return usuario.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const usuario = await this.findOne(id);
    await usuario.destroy();
    return true;
  }
}
