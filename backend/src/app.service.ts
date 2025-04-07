// src/app.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): Record<string, string | number> {
    return {
      app: 'SGII - Sistema de Gestão de Infraestrutura e Inventário',
      status: 'online',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
