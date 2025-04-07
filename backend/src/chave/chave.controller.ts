// src/chave/chave.controller.ts

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
import { ChaveService } from './chave.service';
import { Chave } from './chave.model';

@Controller('chaves')
export class ChaveController {
  constructor(private readonly chaveService: ChaveService) {}

  @Get()
  findAll(): Promise<Chave[]> {
    return this.chaveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Chave> {
    return this.chaveService.findOne(id);
  }

  @Post()
  create(@Body() data: Omit<Chave, 'id'>): Promise<Chave> {
    return this.chaveService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Chave>,
  ): Promise<Chave> {
    return this.chaveService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    return this.chaveService.delete(id);
  }
}
