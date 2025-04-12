// src/sala/sala.model.ts

import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Chave } from '../chave/chave.model';

@Table({ tableName: 'salas' })
export class Sala extends Model<Sala> {
  @ApiProperty({
    example: 1,
    description: 'ID da sala (gerado automaticamente)',
  })
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({
    example: 'Sala 101',
    description: 'Nome identificador da sala',
  })
  @Column(DataType.STRING)
  declare nome: string;

  @ApiProperty({
    example: 'Laboratório',
    description: 'Tipo de sala (ex: Laboratório, Auditório)',
  })
  @Column(DataType.STRING)
  declare tipo: string;

  @ApiProperty({ example: 30, description: 'Capacidade máxima de pessoas' })
  @Column(DataType.INTEGER)
  declare capacidade: number;

  @ApiProperty({
    example: { projetor: true, ar_condicionado: false },
    description: 'Recursos disponíveis na sala',
    type: Object,
  })
  @Column(DataType.JSONB)
  declare recursos: Record<string, boolean>;

  @ApiProperty({ example: 2, description: 'ID da instituição associada' })
  @Column(DataType.INTEGER)
  declare instituicao_id: number;

  @ApiProperty({
    type: () => Chave,
    description: 'Chave vinculada a esta sala',
  })
  @HasOne(() => Chave)
  declare chave: Chave;
}
