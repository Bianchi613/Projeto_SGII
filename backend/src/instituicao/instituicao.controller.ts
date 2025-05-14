// ✅ instituicao.controller.ts
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
import { InstituicaoService } from './instituicao.service';
import { Instituicao } from './instituicao.model';
import { InstituicaoInput } from './instituicao.repository';

@Controller('instituicoes')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  @Get()
  async findAll(): Promise<Instituicao[]> {
    try {
      return await this.instituicaoService.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Erro ao buscar instituições',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Instituicao> {
    try {
      return await this.instituicaoService.findOne(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Instituição não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async create(@Body() data: InstituicaoInput): Promise<Instituicao> {
    try {
      return await this.instituicaoService.create(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Erro ao criar instituição',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<InstituicaoInput>,
  ): Promise<Instituicao> {
    try {
      return await this.instituicaoService.update(id, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Erro ao atualizar instituição',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.instituicaoService.delete(id);
      return { message: 'Instituição removida com sucesso' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erro ao remover instituição',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
