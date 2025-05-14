// ✅ item-inventario.controller.ts
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
import { ItemInventarioService } from './itens-inventario.service';
import { ItemInventario } from './itens-inventario.model';
import { ItemInventarioInput } from './itens-inventario.repository';

@Controller('itens-inventario')
export class ItemInventarioController {
  constructor(private readonly service: ItemInventarioService) {}

  @Get()
  async findAll(): Promise<ItemInventario[]> {
    try {
      return await this.service.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Erro ao buscar itens',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ItemInventario> {
    try {
      return await this.service.findOne(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Item não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() data: ItemInventarioInput): Promise<ItemInventario> {
    try {
      return await this.service.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Erro ao criar item', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<ItemInventarioInput>,
  ): Promise<ItemInventario> {
    try {
      return await this.service.update(id, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Erro ao atualizar item', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.service.delete(id);
      return { message: 'Item removido com sucesso' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Erro ao remover item', HttpStatus.NOT_FOUND);
    }
  }
}
