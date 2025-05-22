import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { JwtPayload } from './auth.types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário e gerar token JWT' })
  @ApiBody({
    description: 'Credenciais do usuário para login',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'joao@email.com' },
        senha: { type: 'string', example: 'senha123' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Login bem-sucedido. Retorna o token JWT.',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example:
            // Exemplo do token JWT contendo id, email e cargo no payload (sub, email, cargo)
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
            'eyJzdWIiOjEsImVtYWlsIjoiam9vQGVtYWlsLmNvbSIsImNhcmdvIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTcxNjEzOTAyMiw' +
            'iZXhwIjoxNzE2MjI1NDIyfQ.' +
            'QNnXPRkZkCjRZghhlcXHt9IxfmOeQPaY8t1ZWnEqxOY',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas ou não autorizadas',
  })
  login(@Request() req: { user: JwtPayload }): { access_token: string } {
    return this.authService.login(req.user);
  }
}
