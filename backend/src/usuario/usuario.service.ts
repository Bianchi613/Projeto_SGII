import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { Usuario } from './usuario.model';

// ✅ Tipo seguro para entrada de dados (agora exportável, se quiser importar em outro lugar)
export type UsuarioInput = {
  nome: string;
  email: string;
  senha_hash: string;
  cargo: string;
  instituicao_id: number;
  nivel_acesso: number;
};

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findByEmail(email);
  }

  async create(data: UsuarioInput): Promise<Usuario> {
    try {
      if (!data.email || !data.nome) {
        throw new BadRequestException('Nome e e-mail são obrigatórios.');
      }
      return await this.usuarioRepository.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao criar usuário.');
    }
  }

  async update(id: number, data: Partial<UsuarioInput>): Promise<Usuario> {
    const usuario = await this.findOne(id);
    try {
      return await this.usuarioRepository.update(usuario, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao atualizar usuário.');
    }
  }

  async delete(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    try {
      await this.usuarioRepository.delete(usuario);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao excluir usuário.');
    }
  }
}
