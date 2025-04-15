import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LogUso } from './logs-uso.model';
import { LogsUsoService } from './logs-uso.service';
import { LogsUsoController } from './logs-uso.controller';
import { Usuario } from '../usuario/usuario.model';

@Module({
  imports: [SequelizeModule.forFeature([LogUso, Usuario])],
  controllers: [LogsUsoController],
  providers: [LogsUsoService],
})
export class LogsUsoModule {}
