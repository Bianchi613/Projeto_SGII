import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from '../usuario/usuario.model';
import { CreationOptional } from 'sequelize';

@Table({ tableName: 'logs_uso' })
export class LogUso extends Model<LogUso> {
  @ApiProperty({ example: 1, description: 'ID do log (autogerado)' })
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @ApiProperty({
    example: 2,
    description: 'ID do usuário relacionado ao log (pode ser nulo)',
  })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare usuario_id: number;

  @ApiProperty({
    example: 'reserva criada',
    description: 'Ação realizada no sistema',
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare acao: string;

  @ApiProperty({
    example: 'reservas',
    description: 'Entidade afetada pela ação',
  })
  @Column({ type: DataType.STRING(50), allowNull: false })
  declare entidade: string;

  @ApiProperty({
    example: 10,
    description: 'ID do registro na entidade afetada',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare entidade_id: number;

  @ApiProperty({
    example: '2025-04-15T14:35:00Z',
    description: 'Data e hora do evento',
  })
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE })
  declare timestamp: Date;

  // RELACIONAMENTO

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare fk_usuario: number;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;
}
