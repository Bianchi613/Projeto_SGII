// ✅ movimentacao-chaves.controller.ts
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
import { MovimentacaoChavesService } from './movimentacao-chaves.service';
import { MovimentacaoChave } from './movimentacao-chaves.model';
import { MovimentacaoChaveInput } from './movimentacao-chaves.repository';

@Controller('movimentacao-chaves')
export class MovimentacaoChavesController {
  constructor(private readonly service: MovimentacaoChavesService) {}

  @Get()
  async findAll(): Promise<MovimentacaoChave[]> {
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
        'Erro ao buscar movimentações',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MovimentacaoChave> {
    try {
      return await this.service.findOne(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Movimentação não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async create(
    @Body() data: MovimentacaoChaveInput,
  ): Promise<MovimentacaoChave> {
    try {
      return await this.service.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Erro ao criar movimentação',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<MovimentacaoChaveInput>,
  ): Promise<MovimentacaoChave> {
    try {
      return await this.service.update(id, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Erro ao atualizar movimentação',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.service.delete(id);
      return { message: 'Movimentação removida com sucesso' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erro ao remover movimentação',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
