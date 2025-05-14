// ✅ item-inventario.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemInventario } from './itens-inventario.model';
import { ItemInventarioRepository } from './itens-inventario.repository';
import { ItemInventarioService } from './itens-inventario.service';
import { ItemInventarioController } from './itens-inventario.controller';

@Module({
  imports: [SequelizeModule.forFeature([ItemInventario])],
  controllers: [ItemInventarioController],
  providers: [ItemInventarioService, ItemInventarioRepository],
  exports: [ItemInventarioService],
})
export class ItensInventarioModule {}
