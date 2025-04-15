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
import { MovimentacaoChavesService } from './movimentacao-chaves.service';
import { MovimentacaoChave } from './movimentacao-chaves.model';
import { CreationAttributes } from 'sequelize';

@ApiTags('Movimentações de Chaves')
@Controller('movimentacoes-chaves')
export class MovimentacaoChavesController {
  constructor(private readonly service: MovimentacaoChavesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as movimentações' })
  @ApiResponse({
    status: 200,
    description: 'Lista de movimentações retornada com sucesso.',
    schema: {
      example: [
        {
          id: 1,
          chave_id: 2,
          usuario_id: 3,
          data_retirada: '2025-04-15T09:00:00.000Z',
          data_devolucao: null,
          responsavel_entrega: 4,
          responsavel_recebimento: null,
          observacoes: 'Em posse do setor de manutenção.',
        },
      ],
    },
  })
  findAll(): Promise<MovimentacaoChave[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar movimentação por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Movimentação encontrada.',
    schema: {
      example: {
        id: 1,
        chave_id: 2,
        usuario_id: 3,
        data_retirada: '2025-04-15T09:00:00.000Z',
        data_devolucao: null,
        responsavel_entrega: 4,
        responsavel_recebimento: null,
        observacoes: 'Em posse do setor de manutenção.',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Movimentação não encontrada.' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MovimentacaoChave | null> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar movimentação de chave' })
  @ApiBody({
    schema: {
      example: {
        chave_id: 1,
        usuario_id: 3,
        data_retirada: '2025-04-15T09:00:00',
        observacoes: 'Entrega para vistoria da elétrica',
        responsavel_entrega: 2,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Movimentação criada com sucesso.',
    schema: {
      example: {
        id: 5,
        chave_id: 1,
        usuario_id: 3,
        data_retirada: '2025-04-15T09:00:00.000Z',
        data_devolucao: null,
        responsavel_entrega: 2,
        responsavel_recebimento: null,
        observacoes: 'Entrega para vistoria da elétrica',
      },
    },
  })
  create(
    @Body() data: CreationAttributes<MovimentacaoChave>,
  ): Promise<MovimentacaoChave> {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar movimentação' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    schema: {
      example: {
        data_devolucao: '2025-04-15T15:00:00',
        responsavel_recebimento: 4,
        observacoes: 'Devolvida no setor de patrimônio',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Movimentação atualizada com sucesso.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<MovimentacaoChave>,
  ): Promise<[number]> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover movimentação por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Movimentação removida com sucesso.',
    schema: {
      example: { success: true },
    },
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: boolean }> {
    const result = await this.service.remove(id);
    return { success: result > 0 };
  }
}
