import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { ChaveService } from './chave.service';
import { Chave } from './chave.model';

@ApiTags('Chaves')
@Controller('chaves')
export class ChaveController {
  constructor(private readonly chaveService: ChaveService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as chaves' })
  @ApiResponse({
    status: 200,
    description: 'Lista de chaves retornada com sucesso',
  })
  @ApiResponse({ status: 500, description: 'Erro ao buscar chaves' })
  async findAll(): Promise<Chave[]> {
    try {
      return await this.chaveService.findAll();
    } catch {
      throw new HttpException(
        'Erro ao buscar chaves',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma chave por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Chave encontrada',
  })
  @ApiResponse({ status: 404, description: 'Chave não encontrada' })
  async findOne(@Param('id') id: number): Promise<Chave> {
    try {
      return await this.chaveService.findOne(id);
    } catch {
      throw new HttpException('Chave não encontrada', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova chave' })
  @ApiBody({
    description: 'Dados da nova chave',
    schema: {
      example: {
        codigo_identificador: 'CHV-002',
        sala_id: 3,
        disponivel: true,
        observacoes: 'Nova chave da sala de reuniões',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Chave criada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao criar chave' })
  async create(@Body() data: Omit<Chave, 'id'>): Promise<Chave> {
    try {
      return await this.chaveService.create(data as any);
    } catch {
      throw new HttpException('Erro ao criar chave', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma chave existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    description: 'Dados para atualização da chave',
    schema: {
      example: {
        codigo_identificador: 'CHV-002',
        sala_id: 3,
        disponivel: false,
        observacoes: 'Emprestada para manutenção',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Chave atualizada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar chave' })
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Chave>,
  ): Promise<Chave> {
    try {
      return await this.chaveService.update(id, data);
    } catch {
      throw new HttpException(
        'Erro ao atualizar chave',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma chave por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Chave removida com sucesso',
    schema: {
      example: {
        message: 'Chave removida com sucesso',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Erro ao remover chave' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.chaveService.delete(id);
      return { message: 'Chave removida com sucesso' };
    } catch {
      throw new HttpException('Erro ao remover chave', HttpStatus.NOT_FOUND);
    }
  }
}
