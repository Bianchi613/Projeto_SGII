import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemInventario } from './itens-inventario.model';
import { ItensInventarioService } from './itens-inventario.service';
import { ItensInventarioController } from './itens-inventario.controller';
import { Instituicao } from '../instituicao/instituicao.model';

@Module({
  imports: [SequelizeModule.forFeature([ItemInventario, Instituicao])],
  controllers: [ItensInventarioController],
  providers: [ItensInventarioService],
})
export class ItensInventarioModule {}
