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
import { ItensInventarioService } from './itens-inventario.service';
import { ItemInventario } from './itens-inventario.model';
import { CreationAttributes } from 'sequelize';

@ApiTags('Itens de Inventário')
@Controller('itens-inventario')
export class ItensInventarioController {
  constructor(private readonly service: ItensInventarioService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os itens do inventário' })
  @ApiResponse({
    status: 200,
    description: 'Itens encontrados com sucesso.',
  })
  findAll(): Promise<ItemInventario[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar item por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Item encontrado com sucesso.',
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ItemInventario | null> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar novo item de inventário' })
  @ApiBody({
    schema: {
      example: {
        nome_item: 'Cadeira Ergonômica',
        descricao: 'Modelo Presidente, preta',
        numero_patrimonio: '987654321BR',
        localizacao_atual: 'Sala 102 - Bloco B',
        quantidade: 5,
        estado_conservacao: 'novo',
        data_aquisicao: '2024-10-20',
        instituicao_id: 2,
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Item criado com sucesso.' })
  create(
    @Body() data: CreationAttributes<ItemInventario>,
  ): Promise<ItemInventario> {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar item de inventário' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    schema: {
      example: {
        quantidade: 4,
        estado_conservacao: 'bom',
        localizacao_atual: 'Sala 105 - Bloco C',
      },
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<ItemInventario>,
  ): Promise<[number]> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover item do inventário' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Item removido com sucesso.' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: boolean }> {
    const result = await this.service.remove(id);
    return { success: result > 0 };
  }
}
