import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ChaveModule } from './chave/chave.module';
import { SalaModule } from './sala/sala.module';
import { AuthModule } from './auth/auth.module';
import { InstituicaoModule } from './instituicao/instituicao.module'; // 👈 novo módulo

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'projeto_sgii',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UsuarioModule,
    ChaveModule,
    SalaModule,
    InstituicaoModule, // 👈 aqui também
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
