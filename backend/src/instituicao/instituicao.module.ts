import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Instituicao } from './instituicao.model';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoController } from './instituicao.controller';

@Module({
  imports: [SequelizeModule.forFeature([Instituicao])],
  controllers: [InstituicaoController],
  providers: [InstituicaoService],
})
export class InstituicaoModule {}
