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
import { ItemInventarioService } from './itens-inventario.service';
import { ItemInventario } from './itens-inventario.model';
import { ItemInventarioInput } from './itens-inventario.repository';

@ApiTags('Itens de Inventário')
@Controller('itens-inventario')
export class ItemInventarioController {
  constructor(private readonly service: ItemInventarioService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os itens do inventário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de itens retornada com sucesso',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno ao buscar itens',
  })
  async findAll(): Promise<ItemInventario[]> {
    try {
      return await this.service.findAll();
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao buscar itens',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar item de inventário por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Item encontrado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Item não encontrado' })
  async findOne(@Param('id') id: number): Promise<ItemInventario> {
    try {
      return await this.service.findOne(id);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Item não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo item de inventário' })
  @ApiBody({
    description: 'Dados para criação do item',
    schema: {
      example: {
        nome_item: 'Projetor Epson X100',
        descricao: 'Projetor multimídia Full HD',
        numero_patrimonio: '123456789BR',
        localizacao_atual: 'Sala 101 - Bloco A',
        quantidade: 2,
        estado_conservacao: 'bom',
        data_aquisicao: '2024-12-01',
        instituicaoId: 1,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Item criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao criar item' })
  async create(@Body() data: ItemInventarioInput): Promise<ItemInventario> {
    try {
      return await this.service.create(data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao criar item',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar item de inventário existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    description: 'Dados para atualização do item',
    schema: {
      example: {
        nome_item: 'Projetor Epson X100',
        descricao: 'Atualização da descrição do projetor',
        quantidade: 3,
        estado_conservacao: 'danificado',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Item atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar item' })
  async update(
    @Param('id') id: number,
    @Body() data: Partial<ItemInventarioInput>,
  ): Promise<ItemInventario> {
    try {
      return await this.service.update(id, data);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao atualizar item',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover item de inventário por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Item removido com sucesso',
    schema: {
      example: { message: 'Item removido com sucesso' },
    },
  })
  @ApiResponse({ status: 404, description: 'Erro ao remover item' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.service.delete(id);
      return { message: 'Item removido com sucesso' };
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao remover item',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
