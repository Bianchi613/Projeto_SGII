import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { InstituicaoService } from './instituicao.service';
import { Instituicao } from './instituicao.model';
import { InstituicaoInput } from './instituicao.repository';

@ApiTags('Instituições')
@Controller('instituicoes')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as instituições' })
  @ApiResponse({
    status: 200,
    description: 'Lista de instituições retornada com sucesso',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno ao buscar instituições',
  })
  async findAll(): Promise<Instituicao[]> {
    try {
      return await this.instituicaoService.findAll();
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao buscar instituições',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma instituição por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Instituição encontrada',
  })
  @ApiResponse({ status: 404, description: 'Instituição não encontrada' })
  async findOne(@Param('id') id: number): Promise<Instituicao> {
    try {
      return await this.instituicaoService.findOne(id);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Instituição não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova instituição' })
  @ApiBody({
    description: 'Dados para criação da instituição',
    schema: {
      example: {
        nome: 'Instituto Federal do Norte',
        tipo: 'universidade',
        cnpj_ou_codigo: '12.345.678/0001-99',
        endereco: 'Rua das Palmeiras, 1000',
        telefone: '(11) 91234-5678',
        email: 'contato@ifn.edu.br',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Instituição criada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao criar instituição' })
  async create(@Body() data: InstituicaoInput): Promise<Instituicao> {
    try {
      return await this.instituicaoService.create(data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao criar instituição',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma instituição existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    description: 'Dados para atualização da instituição',
    schema: {
      example: {
        nome: 'Universidade Federal do Rio',
        tipo: 'universidade',
        cnpj_ou_codigo: '98.765.432/0001-55',
        endereco: 'Av. Brasil, 5000',
        telefone: '(21) 98888-2222',
        email: 'secretaria@ufr.edu.br',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Instituição atualizada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar instituição' })
  async update(
    @Param('id') id: number,
    @Body() data: Partial<InstituicaoInput>,
  ): Promise<Instituicao> {
    try {
      return await this.instituicaoService.update(id, data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar instituição',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma instituição por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Instituição removida com sucesso',
    schema: {
      example: {
        message: 'Instituição removida com sucesso',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Erro ao remover instituição' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.instituicaoService.delete(id);
      return { message: 'Instituição removida com sucesso' };
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao remover instituição',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
