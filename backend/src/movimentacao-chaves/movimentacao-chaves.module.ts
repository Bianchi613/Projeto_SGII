import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovimentacaoChave } from './movimentacao-chaves.model';
import { MovimentacaoChavesService } from './movimentacao-chaves.service';
import { MovimentacaoChavesController } from './movimentacao-chaves.controller';
import { Chave } from '../chave/chave.model';
import { Usuario } from '../usuario/usuario.model';

@Module({
  imports: [SequelizeModule.forFeature([MovimentacaoChave, Chave, Usuario])],
  controllers: [MovimentacaoChavesController],
  providers: [MovimentacaoChavesService],
})
export class MovimentacaoChavesModule {}
