import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reserva } from './reserva.model';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { Sala } from '../sala/sala.model';
import { Usuario } from '../usuario/usuario.model';

@Module({
  imports: [SequelizeModule.forFeature([Reserva, Sala, Usuario])],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
