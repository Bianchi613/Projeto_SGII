// ✅ instituicao.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  InstituicaoRepository,
  InstituicaoInput,
} from './instituicao.repository';
import { Instituicao } from './instituicao.model';

@Injectable()
export class InstituicaoService {
  constructor(private readonly instituicaoRepository: InstituicaoRepository) {}

  async findAll(): Promise<Instituicao[]> {
    return this.instituicaoRepository.findAll();
  }

  async findOne(id: number): Promise<Instituicao> {
    const instituicao = await this.instituicaoRepository.findOne(id);
    if (!instituicao) {
      throw new NotFoundException(`Instituição com ID ${id} não encontrada.`);
    }
    return instituicao;
  }

  async create(data: InstituicaoInput): Promise<Instituicao> {
    try {
      if (!data.nome || !data.cnpj_ou_codigo) {
        throw new BadRequestException('Nome e CNPJ/código são obrigatórios.');
      }
      return await this.instituicaoRepository.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao criar instituição.');
    }
  }

  async update(
    id: number,
    data: Partial<InstituicaoInput>,
  ): Promise<Instituicao> {
    const instituicao = await this.findOne(id);
    try {
      return await this.instituicaoRepository.update(instituicao, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao atualizar instituição.');
    }
  }

  async delete(id: number): Promise<void> {
    const instituicao = await this.findOne(id);
    try {
      await this.instituicaoRepository.delete(instituicao);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Erro ao excluir instituição.');
    }
  }
}
