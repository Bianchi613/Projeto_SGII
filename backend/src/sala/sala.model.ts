import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Chave } from '../chave/chave.model';
import { Reserva } from '../reserva/reserva.model';
import { Instituicao } from '../instituicao/instituicao.model';

@Table({ tableName: 'salas' })
export class Sala extends Model<Sala> {
  @ApiProperty({ example: 1 })
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({ example: 'Sala 101' })
  @Column(DataType.STRING)
  declare nome: string;

  @ApiProperty({ example: 'Laboratório' })
  @Column(DataType.STRING)
  declare tipo: string;

  @ApiProperty({ example: 30 })
  @Column(DataType.INTEGER)
  declare capacidade: number;

  @ApiProperty({ example: { projetor: true, ar_condicionado: false } })
  @Column(DataType.JSONB)
  declare recursos: Record<string, boolean>;

  @ApiProperty({ example: 2 })
  @ForeignKey(() => Instituicao)
  @Column(DataType.INTEGER)
  declare instituicao_id: number;

  @BelongsTo(() => Instituicao)
  declare instituicao: Instituicao;

  @ApiProperty({ type: () => Chave })
  @HasOne(() => Chave)
  declare chave: Chave;

  @ApiProperty({ type: () => [Reserva] })
  @HasMany(() => Reserva)
  declare reservas: Reserva[];
}
