// ✅ logs-uso.controller.ts
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
import { LogsUsoService } from './logs-uso.service';
import { LogUso } from './logs-uso.model';
import { LogUsoInput } from './logs-uso.repository';

@Controller('logs-uso')
export class LogsUsoController {
  constructor(private readonly service: LogsUsoService) {}

  @Get()
  async findAll(): Promise<LogUso[]> {
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
        'Erro ao buscar logs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<LogUso> {
    try {
      return await this.service.findOne(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Log não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() data: LogUsoInput): Promise<LogUso> {
    try {
      return await this.service.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Erro ao criar log', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<LogUsoInput>,
  ): Promise<LogUso> {
    try {
      return await this.service.update(id, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Erro ao atualizar log', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.service.delete(id);
      return { message: 'Log removido com sucesso' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Erro ao remover log', HttpStatus.NOT_FOUND);
    }
  }
}
