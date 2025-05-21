import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { Usuario } from './usuario.model';
import * as bcrypt from 'bcrypt';

// ✅ Tipo seguro para entrada de dados
export type UsuarioInput = {
  nome: string;
  email: string;
  senha: string;
  cargo: string;
  instituicao_id: number;
  nivel_acesso: number;
};

// ✅ Tipo seguro para criação de usuário no banco
export type UsuarioCreateData = {
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
      const { nome, email, senha, cargo, instituicao_id, nivel_acesso } = data;

      if (!email || !nome || !senha) {
        throw new BadRequestException('Nome, e-mail e senha são obrigatórios.');
      }

      const senha_hash = await bcrypt.hash(senha, 10);
      const usuarioData: UsuarioCreateData = {
        nome,
        email,
        senha_hash,
        cargo,
        instituicao_id,
        nivel_acesso,
      };

      return await this.usuarioRepository.create(usuarioData);
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
      const dataAtualizada: Partial<UsuarioCreateData> = { ...data };

      if (
        'senha' in data &&
        typeof data.senha === 'string' &&
        data.senha.trim() !== ''
      ) {
        dataAtualizada.senha_hash = await bcrypt.hash(data.senha, 10);
        delete dataAtualizada['senha'];
      }

      return await this.usuarioRepository.update(usuario, dataAtualizada);
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
