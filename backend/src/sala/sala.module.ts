// ✅ sala.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sala } from './sala.model';
import { SalaRepository } from './sala.repository';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';

@Module({
  imports: [SequelizeModule.forFeature([Sala])],
  controllers: [SalaController],
  providers: [SalaService, SalaRepository],
  exports: [SalaService],
})
export class SalaModule {}
