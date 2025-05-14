// ✅ movimentacao-chaves.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovimentacaoChave } from './movimentacao-chaves.model';
import { MovimentacaoChavesRepository } from './movimentacao-chaves.repository';
import { MovimentacaoChavesService } from './movimentacao-chaves.service';
import { MovimentacaoChavesController } from './movimentacao-chaves.controller';

@Module({
  imports: [SequelizeModule.forFeature([MovimentacaoChave])],
  controllers: [MovimentacaoChavesController],
  providers: [MovimentacaoChavesService, MovimentacaoChavesRepository],
  exports: [MovimentacaoChavesService],
})
export class MovimentacaoChavesModule {}
