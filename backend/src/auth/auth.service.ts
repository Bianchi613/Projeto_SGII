import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtPayload } from './auth.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<JwtPayload> {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // Retorne os campos importantes para o JWT payload e para uso geral
    const { id, email: userEmail, cargo } = usuario;
    return { id, email: userEmail, cargo };
  }

  login(user: JwtPayload): { access_token: string } {
    // Use 'sub' como padrão JWT para o id
    const payload = {
      sub: user.id,
      email: user.email,
      cargo: user.cargo,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
