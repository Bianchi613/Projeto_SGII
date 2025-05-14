import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ChaveService } from './chave.service';
import { Chave } from './chave.model';

@Controller('chaves')
export class ChaveController {
  constructor(private readonly chaveService: ChaveService) {}

  @Get()
  async findAll(): Promise<Chave[]> {
    try {
      return await this.chaveService.findAll();
    } catch {
      throw new HttpException(
        'Erro ao buscar chaves',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Chave> {
    try {
      return await this.chaveService.findOne(id);
    } catch {
      throw new HttpException('Chave não encontrada', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() data: Omit<Chave, 'id'>): Promise<Chave> {
    try {
      return await this.chaveService.create(data as any); // usar DTO no lugar do "any" futuramente
    } catch {
      throw new HttpException('Erro ao criar chave', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Chave>,
  ): Promise<Chave> {
    try {
      return await this.chaveService.update(id, data);
    } catch {
      throw new HttpException(
        'Erro ao atualizar chave',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.chaveService.delete(id);
      return { message: 'Chave removida com sucesso' };
    } catch {
      throw new HttpException('Erro ao remover chave', HttpStatus.NOT_FOUND);
    }
  }
}
