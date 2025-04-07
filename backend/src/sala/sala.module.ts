// src/sala/sala.module.ts

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sala } from './sala.model';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';

@Module({
  imports: [SequelizeModule.forFeature([Sala])],
  controllers: [SalaController],
  providers: [SalaService],
})
export class SalaModule {}
