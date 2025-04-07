import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost', // <- substitua se necessário
      port: 5432, // <- porta padrão do PostgreSQL
      username: 'postgres', // <- substitua
      password: '12345', // <- substitua
      database: 'projeto_sgii', // <- substitua
      autoLoadModels: true,
      synchronize: true, // cuidado em produção
      logging: true,
    }),
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
