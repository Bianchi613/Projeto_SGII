// ✅ logs-uso.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LogUso } from './logs-uso.model';
import { LogsUsoRepository } from './logs-uso.repository';
import { LogsUsoService } from './logs-uso.service';
import { LogsUsoController } from './logs-uso.controller';

@Module({
  imports: [SequelizeModule.forFeature([LogUso])],
  controllers: [LogsUsoController],
  providers: [LogsUsoService, LogsUsoRepository],
  exports: [LogsUsoService],
})
export class LogsUsoModule {}
