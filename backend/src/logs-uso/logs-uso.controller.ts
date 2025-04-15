import {
  Controller,
  Get,
  Post,
  Body,
  Param,
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
import { LogsUsoService } from './logs-uso.service';
import { LogUso } from './logs-uso.model';
import { CreationAttributes } from 'sequelize';

@ApiTags('Logs de Uso')
@Controller('logs-uso')
export class LogsUsoController {
  constructor(private readonly service: LogsUsoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os logs de uso' })
  @ApiResponse({ status: 200, description: 'Logs retornados com sucesso.' })
  findAll(): Promise<LogUso[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar log de uso por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Log encontrado.' })
  @ApiResponse({ status: 404, description: 'Log não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<LogUso | null> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo log de uso' })
  @ApiBody({
    schema: {
      example: {
        usuario_id: 2,
        acao: 'reserva criada',
        entidade: 'reservas',
        entidade_id: 15,
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Log criado com sucesso.' })
  create(@Body() data: CreationAttributes<LogUso>): Promise<LogUso> {
    return this.service.create(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover log por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Log removido com sucesso.' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: boolean }> {
    const result = await this.service.remove(id);
    return { success: result > 0 };
  }
}
