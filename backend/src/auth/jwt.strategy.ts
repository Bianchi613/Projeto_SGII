import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'minha_chave_secreta_super_segura',
    });
  }

  validate(payload: JwtPayload) {
    // O que for retornado aqui vai virar req.user nas rotas protegidas
    return {
      id: payload.id,
      email: payload.email,
      cargo: payload.cargo,
    };
  }
}
