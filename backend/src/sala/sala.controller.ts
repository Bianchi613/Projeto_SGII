// src/sala/sala.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { SalaService } from './sala.service';
import { Sala } from './sala.model';

@Controller('salas')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Get()
  findAll(): Promise<Sala[]> {
    return this.salaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Sala> {
    return this.salaService.findOne(id);
  }

  @Post()
  create(@Body() data: Omit<Sala, 'id'>): Promise<Sala> {
    return this.salaService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Sala>,
  ): Promise<Sala> {
    return this.salaService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    return this.salaService.delete(id);
  }
}
