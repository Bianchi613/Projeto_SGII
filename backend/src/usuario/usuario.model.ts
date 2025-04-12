// src/usuario/usuario.model.ts

import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'usuarios' })
export class Usuario extends Model<Usuario> {
  @ApiProperty({
    example: 1,
    description: 'ID do usuário (gerado automaticamente)',
  })
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do usuário',
  })
  @Column(DataType.STRING)
  declare nome: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'Email único do usuário',
  })
  @Column({ type: DataType.STRING, unique: true })
  declare email: string;

  @ApiProperty({
    example: '$2b$10$abc...',
    description: 'Hash da senha do usuário',
  })
  @Column(DataType.STRING)
  declare senha_hash: string;

  @ApiProperty({
    example: 'Administrador',
    description: 'Cargo ou função do usuário',
  })
  @Column(DataType.STRING)
  declare cargo: string;

  @ApiProperty({
    example: 2,
    description: 'ID da instituição vinculada ao usuário',
  })
  @Column(DataType.INTEGER)
  declare instituicao_id: number;

  @ApiProperty({
    example: 1,
    description: 'Nível de acesso (ex: 1 = admin, 2 = usuário)',
  })
  @Column(DataType.INTEGER)
  declare nivel_acesso: number;
}
