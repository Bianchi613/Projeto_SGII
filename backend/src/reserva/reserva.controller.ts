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
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ReservaService } from './reserva.service';
import { Reserva } from './reserva.model';
import { ReservaInput } from './reserva.repository';

@ApiTags('Reservas')
@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as reservas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de reservas retornada com sucesso',
  })
  @ApiResponse({ status: 500, description: 'Erro ao buscar reservas' })
  async findAll(): Promise<Reserva[]> {
    try {
      return await this.reservaService.findAll();
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao buscar reservas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma reserva por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Reserva encontrada' })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada' })
  async findOne(@Param('id') id: number): Promise<Reserva> {
    try {
      return await this.reservaService.findOne(id);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Reserva não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova reserva' })
  @ApiBody({
    description: 'Dados para criação da reserva',
    schema: {
      example: {
        usuarioId: 5,
        salaId: 3,
        data_inicio: '2025-04-20T10:00:00',
        data_fim: '2025-04-20T12:00:00',
        finalidade: 'Reunião da equipe de TI',
        status: 'pendente',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Reserva criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar reserva' })
  async create(@Body() data: ReservaInput): Promise<Reserva> {
    try {
      return await this.reservaService.create(data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao criar reserva',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma reserva existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    description: 'Dados para atualização da reserva',
    schema: {
      example: {
        data_inicio: '2025-04-20T11:00:00',
        data_fim: '2025-04-20T13:00:00',
        finalidade: 'Atualização da reunião',
        status: 'confirmada',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Reserva atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar reserva' })
  async update(
    @Param('id') id: number,
    @Body() data: Partial<ReservaInput>,
  ): Promise<Reserva> {
    try {
      return await this.reservaService.update(id, data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao atualizar reserva',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma reserva por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Reserva removida com sucesso',
    schema: {
      example: {
        message: 'Reserva removida com sucesso',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Erro ao remover reserva' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.reservaService.delete(id);
      return { message: 'Reserva removida com sucesso' };
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao remover reserva',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
