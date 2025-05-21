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
import { SalaService } from './sala.service';
import { Sala } from './sala.model';
import { SalaInput } from './sala.repository';

@ApiTags('Salas')
@Controller('salas')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as salas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de salas retornada com sucesso',
  })
  @ApiResponse({ status: 500, description: 'Erro interno ao buscar salas' })
  async findAll(): Promise<Sala[]> {
    try {
      return await this.salaService.findAll();
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao buscar salas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma sala por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Sala encontrada' })
  @ApiResponse({ status: 404, description: 'Sala não encontrada' })
  async findOne(@Param('id') id: number): Promise<Sala> {
    try {
      return await this.salaService.findOne(id);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Sala não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova sala' })
  @ApiBody({
    description: 'Dados necessários para criar uma sala',
    schema: {
      example: {
        nome: 'Sala 101',
        tipo: 'Laboratório',
        capacidade: 30,
        recursos: {
          projetor: true,
          ar_condicionado: true,
          lousa_digital: false,
        },
        instituicao_id: 2,
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Sala criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar sala' })
  async create(@Body() data: SalaInput): Promise<Sala> {
    try {
      return await this.salaService.create(data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao criar sala',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados de uma sala' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    description: 'Campos para atualizar parcialmente uma sala existente',
    schema: {
      example: {
        nome: 'Sala 101 - Atualizada',
        tipo: 'Auditório',
        capacidade: 50,
        recursos: {
          projetor: true,
          ar_condicionado: false,
        },
        instituicao_id: 2,
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Sala atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar sala' })
  async update(
    @Param('id') id: number,
    @Body() data: Partial<SalaInput>,
  ): Promise<Sala> {
    try {
      return await this.salaService.update(id, data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao atualizar sala',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma sala por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Sala removida com sucesso',
    schema: {
      example: {
        message: 'Sala removida com sucesso',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Erro ao remover sala' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.salaService.delete(id);
      return { message: 'Sala removida com sucesso' };
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao remover sala',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
