// ✅ instituicao.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Instituicao } from './instituicao.model';
import { InstituicaoController } from './instituicao.controller';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoRepository } from './instituicao.repository';

@Module({
  imports: [SequelizeModule.forFeature([Instituicao])],
  controllers: [InstituicaoController],
  providers: [InstituicaoService, InstituicaoRepository],
  exports: [InstituicaoService],
})
export class InstituicaoModule {}
