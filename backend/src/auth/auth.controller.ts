import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { JwtPayload } from './auth.types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário e gerar token JWT' })
  @ApiBody({
    schema: {
      example: {
        email: 'usuario@email.com',
        senha: 'senha123',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Login bem-sucedido. Retorna o token JWT.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  login(@Request() req: { user: JwtPayload }) {
    return this.authService.login(req.user);
  }
}
