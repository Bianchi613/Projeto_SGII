// src/chave/chave.module.ts

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chave } from './chave.model';
import { ChaveService } from './chave.service';
import { ChaveController } from './chave.controller';

@Module({
  imports: [SequelizeModule.forFeature([Chave])],
  controllers: [ChaveController],
  providers: [ChaveService],
})
export class ChaveModule {}
