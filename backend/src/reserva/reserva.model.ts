import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Sala } from '../sala/sala.model';
import { Usuario } from '../usuario/usuario.model';

@Table({ tableName: 'reservas' })
export class Reserva extends Model<Reserva> {
  @ApiProperty({ example: 1, description: 'ID da reserva (autogerado)' })
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({ example: 5, description: 'ID do usuário que fez a reserva' })
  @ForeignKey(() => Usuario)
  @Column({ field: 'usuario_id', type: DataType.INTEGER, allowNull: false })
  declare usuarioId: number;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;

  @ApiProperty({ example: 3, description: 'ID da sala reservada' })
  @ForeignKey(() => Sala)
  @Column({ field: 'sala_id', type: DataType.INTEGER, allowNull: false })
  declare salaId: number;

  @BelongsTo(() => Sala)
  declare sala: Sala;

  @ApiProperty({
    example: '2025-04-20T10:00:00',
    description: 'Data e hora de início da reserva',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  declare data_inicio: Date;

  @ApiProperty({
    example: '2025-04-20T12:00:00',
    description: 'Data e hora de fim da reserva',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  declare data_fim: Date;

  @ApiProperty({
    example: 'Reunião da equipe de TI',
    description: 'Finalidade da reserva',
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare finalidade?: string;

  @ApiProperty({
    example: 'pendente',
    description: "Status da reserva: 'pendente', 'confirmada' ou 'cancelada'",
  })
  @Column({ type: DataType.STRING(20), defaultValue: 'pendente' })
  declare status: string;
}
