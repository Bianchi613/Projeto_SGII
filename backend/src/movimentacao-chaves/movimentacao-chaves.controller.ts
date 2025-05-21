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

import { MovimentacaoChavesService } from './movimentacao-chaves.service';
import { MovimentacaoChave } from './movimentacao-chaves.model';
import { MovimentacaoChaveInput } from './movimentacao-chaves.repository';

@ApiTags('Movimentações de Chaves')
@Controller('movimentacao-chaves')
export class MovimentacaoChavesController {
  constructor(private readonly service: MovimentacaoChavesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as movimentações de chaves' })
  @ApiResponse({
    status: 200,
    description: 'Lista de movimentações retornada com sucesso',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno ao buscar movimentações',
  })
  async findAll(): Promise<MovimentacaoChave[]> {
    try {
      return await this.service.findAll();
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao buscar movimentações',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma movimentação por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Movimentação encontrada' })
  @ApiResponse({ status: 404, description: 'Movimentação não encontrada' })
  async findOne(@Param('id') id: number): Promise<MovimentacaoChave> {
    try {
      return await this.service.findOne(id);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Movimentação não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova movimentação de chave' })
  @ApiBody({
    description: 'Dados para criação de movimentação de chave',
    schema: {
      example: {
        chaveId: 2,
        usuarioId: 5,
        data_retirada: '2025-04-15T09:00:00',
        data_devolucao: '2025-04-15T15:00:00',
        responsavel_entrega: 8,
        responsavel_recebimento: 9,
        observacoes: 'Chave emprestada para manutenção elétrica',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Movimentação criada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao criar movimentação' })
  async create(
    @Body() data: MovimentacaoChaveInput,
  ): Promise<MovimentacaoChave> {
    try {
      return await this.service.create(data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao criar movimentação',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma movimentação existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    description: 'Dados para atualização da movimentação',
    schema: {
      example: {
        data_devolucao: '2025-04-15T17:00:00',
        responsavel_recebimento: 10,
        observacoes: 'Devolução feita com atraso',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Movimentação atualizada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar movimentação' })
  async update(
    @Param('id') id: number,
    @Body() data: Partial<MovimentacaoChaveInput>,
  ): Promise<MovimentacaoChave> {
    try {
      return await this.service.update(id, data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar movimentação',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma movimentação por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Movimentação removida com sucesso',
    schema: {
      example: {
        message: 'Movimentação removida com sucesso',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao remover movimentação',
  })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.service.delete(id);
      return { message: 'Movimentação removida com sucesso' };
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao remover movimentação',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
