// ✅ reserva.controller.ts
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
import { ReservaService } from './reserva.service';
import { Reserva } from './reserva.model';
import { ReservaInput } from './reserva.repository';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get()
  async findAll(): Promise<Reserva[]> {
    try {
      return await this.reservaService.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Erro ao buscar reservas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Reserva> {
    try {
      return await this.reservaService.findOne(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Reserva não encontrada', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() data: ReservaInput): Promise<Reserva> {
    try {
      return await this.reservaService.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Erro ao criar reserva', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<ReservaInput>,
  ): Promise<Reserva> {
    try {
      return await this.reservaService.update(id, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Erro ao atualizar reserva',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.reservaService.delete(id);
      return { message: 'Reserva removida com sucesso' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Erro ao remover reserva', HttpStatus.NOT_FOUND);
    }
  }
}
