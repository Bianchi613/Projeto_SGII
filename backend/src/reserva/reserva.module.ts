// ✅ reserva.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reserva } from './reserva.model';
import { ReservaRepository } from './reserva.repository';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';

@Module({
  imports: [SequelizeModule.forFeature([Reserva])],
  controllers: [ReservaController],
  providers: [ReservaService, ReservaRepository],
  exports: [ReservaService],
})
export class ReservaModule {}
