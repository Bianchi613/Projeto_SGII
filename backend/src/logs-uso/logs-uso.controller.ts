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
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import { LogsUsoService } from './logs-uso.service';
import { LogUso } from './logs-uso.model';
import { LogUsoInput } from './logs-uso.repository';

@ApiTags('Logs de Uso')
@Controller('logs-uso')
export class LogsUsoController {
  constructor(private readonly service: LogsUsoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os logs de uso' })
  @ApiResponse({
    status: 200,
    description: 'Lista de logs retornada com sucesso',
  })
  async findAll(): Promise<LogUso[]> {
    try {
      return await this.service.findAll();
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao buscar logs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um log por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Log encontrado',
  })
  @ApiResponse({ status: 404, description: 'Log não encontrado' })
  async findOne(@Param('id') id: number): Promise<LogUso> {
    try {
      return await this.service.findOne(id);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Log não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo log de uso' })
  @ApiBody({
    description: 'Dados para criação de log',
    schema: {
      example: {
        usuario_id: 5,
        acao: 'reserva criada',
        entidade: 'reservas',
        entidade_id: 10,
        timestamp: '2025-04-15T14:35:00Z',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Log criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao criar log' })
  async create(@Body() data: LogUsoInput): Promise<LogUso> {
    try {
      return await this.service.create(data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao criar log',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um log de uso existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    description: 'Dados para atualização do log',
    schema: {
      example: {
        acao: 'reserva atualizada',
        entidade: 'reservas',
        entidade_id: 10,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Log atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar log' })
  async update(
    @Param('id') id: number,
    @Body() data: Partial<LogUsoInput>,
  ): Promise<LogUso> {
    try {
      return await this.service.update(id, data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao atualizar log',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um log por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Log removido com sucesso',
    schema: {
      example: {
        message: 'Log removido com sucesso',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Erro ao remover log' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.service.delete(id);
      return { message: 'Log removido com sucesso' };
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao remover log',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
