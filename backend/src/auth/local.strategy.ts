import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configura os campos para email e senha no corpo da requisição
    super({ usernameField: 'email', passwordField: 'senha' });
  }

  async validate(email: string, senha: string): Promise<any> {
    // Valida o usuário com email e senha e retorna objeto contendo id, email e cargo
    const user = await this.authService.validateUser(email, senha);

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // Retorna o objeto completo do usuário validado (inclui id)
    return user;
  }
}
