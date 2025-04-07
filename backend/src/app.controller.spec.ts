import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return status info object', () => {
      const status = appController.getStatus();
      expect(status).toHaveProperty('app');
      expect(status).toHaveProperty('status');
      expect(status).toHaveProperty('versão');
      expect(status).toHaveProperty('timestamp');
      expect(status.status).toBe('online');
    });
  });
});
