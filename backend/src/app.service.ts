// src/app.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): Record<string, string> {
    return {
      app: 'SGII - Sistema de Gestão de Infraestrutura e Inventário',
      status: 'online',
      versão: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
