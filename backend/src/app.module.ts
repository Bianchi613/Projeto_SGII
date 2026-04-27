import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ChaveModule } from './chave/chave.module';
import { SalaModule } from './sala/sala.module';
import { AuthModule } from './auth/auth.module';
import { InstituicaoModule } from './instituicao/instituicao.module';
import { ReservaModule } from './reserva/reserva.module'; // 👈 novo módulo
import { ItensInventarioModule } from './itens-inventario/itens-inventario.module';
import { LogsUsoModule } from './logs-uso/logs-uso.module';
import { MovimentacaoChavesModule } from './movimentacao-chaves/movimentacao-chaves.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: Number(configService.get<string>('DB_PORT', '5432')),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_DATABASE', 'projeto_sgii'),
        autoLoadModels: true,
        synchronize: configService.get<string>('DB_SYNC', 'true') === 'true',
        logging: configService.get<string>('DB_LOGGING', 'false') === 'true',
      }),
    }),
    UsuarioModule,
    ChaveModule,
    SalaModule,
    InstituicaoModule,
    MovimentacaoChavesModule,
    ReservaModule, //
    ItensInventarioModule,
    LogsUsoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
