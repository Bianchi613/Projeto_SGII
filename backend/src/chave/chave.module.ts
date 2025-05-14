import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chave } from './chave.model';
import { ChaveController } from './chave.controller';
import { ChaveService } from './chave.service';
import { ChaveRepository } from './chave.repository';

@Module({
  imports: [SequelizeModule.forFeature([Chave])],
  controllers: [ChaveController],
  providers: [ChaveService, ChaveRepository],
})
export class ChaveModule {}
