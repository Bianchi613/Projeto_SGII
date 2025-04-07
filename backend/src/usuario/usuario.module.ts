// src/usuario/usuario.module.ts

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
  providers: [UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
