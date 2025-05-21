import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import * as bcrypt from 'bcrypt';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty(
          'app',
          'SGII - Sistema de Gestão de Infraestrutura e Inventário',
        );
        expect(res.body).toHaveProperty('status', 'online');
        expect(res.body).toHaveProperty('versão');
        expect(res.body).toHaveProperty('timestamp');
      });
  });

  it('deve verificar se a senha "senha123" corresponde ao hash', async () => {
    const hash = '$2b$10$oSTmyzy.rxTauOOwYOKB.ePmdPHRSxMg9d2gRzAeGn6pVxPPSx236';
    const result = await bcrypt.compare('senha123', hash);
    expect(result).toBe(true);
  });
});
