import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Instituicao } from '../instituicao/instituicao.model';
import { Reserva } from '../reserva/reserva.model';
import { LogUso } from '../logs-uso/logs-uso.model';
import { MovimentacaoChave } from '../movimentacao-chaves/movimentacao-chaves.model';

@Table({ tableName: 'usuarios' })
export class Usuario extends Model<Usuario> {
  @ApiProperty({ example: 1 })
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({ example: 'João da Silva' })
  @Column(DataType.STRING)
  declare nome: string;

  @ApiProperty({ example: 'joao@email.com' })
  @Column({ type: DataType.STRING, unique: true })
  declare email: string;

  @ApiProperty({ example: '$2b$10$abc...' })
  @Column(DataType.STRING)
  declare senha_hash: string;

  @ApiProperty({ example: 'Administrador' })
  @Column(DataType.STRING)
  declare cargo: string;

  @ApiProperty({ example: 2 })
  @ForeignKey(() => Instituicao)
  @Column(DataType.INTEGER)
  declare instituicao_id: number;

  @BelongsTo(() => Instituicao)
  declare instituicao: Instituicao;

  @ApiProperty({ example: 1 })
  @Column(DataType.INTEGER)
  declare nivel_acesso: number;

  // RELACIONAMENTOS

  @HasMany(() => Reserva)
  declare reservas: Reserva[];

  @HasMany(() => LogUso)
  declare logs_uso: LogUso[];

  @HasMany(() => MovimentacaoChave)
  declare movimentacoes_chaves: MovimentacaoChave[];
}
