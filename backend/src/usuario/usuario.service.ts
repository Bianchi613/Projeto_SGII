// src/usuario/usuario.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario.model';

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

  async create(data: Omit<Usuario, 'id'>): Promise<Usuario> {
    return this.usuarioModel.create(data as any);
  }

  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.findOne(id); // já lida com possível null
    return usuario.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const usuario = await this.findOne(id); // já lida com possível null
    await usuario.destroy();
    return true;
  }
}
