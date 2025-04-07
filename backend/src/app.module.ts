import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsuarioModule } from './usuario/usuario.module';
import { ChaveModule } from './chave/chave.module'; // 👈 Adicionado aqui

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
      logging: true,
    }),
    UsuarioModule,
    ChaveModule, // 👈 Adicionado aqui também
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
