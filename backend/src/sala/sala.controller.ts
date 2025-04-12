import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { SalaService } from './sala.service';
import { Sala } from './sala.model';

@ApiTags('Salas')
@Controller('salas')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as salas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de salas retornada com sucesso',
    schema: {
      example: [
        {
          id: 1,
          nome: 'Sala 101',
          tipo: 'Laboratório',
          capacidade: 30,
          recursos: {
            projetor: true,
            ar_condicionado: true,
            acessibilidade: false,
          },
          instituicao_id: 2,
        },
      ],
    },
  })
  findAll(): Promise<Sala[]> {
    return this.salaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar sala por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da sala a ser buscada',
  })
  @ApiResponse({
    status: 200,
    description: 'Sala encontrada com sucesso',
    schema: {
      example: {
        id: 1,
        nome: 'Sala 101',
        tipo: 'Auditório',
        capacidade: 50,
        recursos: {
          projetor: true,
          ar_condicionado: false,
        },
        instituicao_id: 3,
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Sala> {
    return this.salaService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova sala' })
  @ApiBody({
    schema: {
      example: {
        nome: 'Sala 202',
        tipo: 'Sala de Reunião',
        capacidade: 15,
        recursos: {
          projetor: false,
          ar_condicionado: true,
        },
        instituicao_id: 1,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Sala criada com sucesso',
    schema: {
      example: {
        id: 5,
        nome: 'Sala 202',
        tipo: 'Sala de Reunião',
        capacidade: 15,
        recursos: {
          projetor: false,
          ar_condicionado: true,
        },
        instituicao_id: 1,
      },
    },
  })
  create(@Body() data: Omit<Sala, 'id'>): Promise<Sala> {
    return this.salaService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar sala existente' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da sala a ser atualizada',
  })
  @ApiBody({
    schema: {
      example: {
        nome: 'Sala 303 - Atualizada',
        tipo: 'Sala de Aula',
        capacidade: 40,
        recursos: {
          projetor: true,
          ar_condicionado: true,
        },
        instituicao_id: 2,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Sala atualizada com sucesso',
    schema: {
      example: {
        id: 3,
        nome: 'Sala 303 - Atualizada',
        tipo: 'Sala de Aula',
        capacidade: 40,
        recursos: {
          projetor: true,
          ar_condicionado: true,
        },
        instituicao_id: 2,
      },
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Sala>,
  ): Promise<Sala> {
    return this.salaService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover sala por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da sala a ser removida',
  })
  @ApiResponse({
    status: 200,
    description: 'Sala removida com sucesso',
    schema: {
      example: { success: true },
    },
  })
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    return this.salaService.delete(id);
  }
}
