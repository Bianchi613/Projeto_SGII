import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ReservaService } from './reserva.service';
import { Reserva } from './reserva.model';
import { CreationAttributes } from 'sequelize';

@ApiTags('Reservas')
@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as reservas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de reservas retornada com sucesso.',
    schema: {
      example: [
        {
          id: 1,
          sala_id: 3,
          usuario_id: 5,
          data_inicio: '2025-04-20T10:00:00.000Z',
          data_fim: '2025-04-20T12:00:00.000Z',
          finalidade: 'Reunião do time de TI',
          status: 'pendente',
        },
      ],
    },
  })
  findAll(): Promise<Reserva[]> {
    return this.reservaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar reserva por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da reserva' })
  @ApiResponse({
    status: 200,
    description: 'Reserva encontrada.',
    schema: {
      example: {
        id: 1,
        sala_id: 3,
        usuario_id: 5,
        data_inicio: '2025-04-20T10:00:00.000Z',
        data_fim: '2025-04-20T12:00:00.000Z',
        finalidade: 'Reunião do time de TI',
        status: 'pendente',
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Reserva | null> {
    return this.reservaService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova reserva' })
  @ApiBody({
    schema: {
      example: {
        sala_id: 3,
        usuario_id: 5,
        data_inicio: '2025-04-20T10:00:00',
        data_fim: '2025-04-20T12:00:00',
        finalidade: 'Reunião de planejamento',
        status: 'pendente',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Reserva criada com sucesso.',
  })
  create(@Body() data: CreationAttributes<Reserva>): Promise<Reserva> {
    return this.reservaService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar reserva existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    schema: {
      example: {
        data_inicio: '2025-04-20T14:00:00',
        data_fim: '2025-04-20T15:00:00',
        status: 'confirmada',
      },
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Reserva>,
  ): Promise<[number]> {
    return this.reservaService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover reserva por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Reserva removida com sucesso.',
    schema: {
      example: { success: true },
    },
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: boolean }> {
    const result = await this.reservaService.remove(id);
    return { success: result > 0 };
  }
}
