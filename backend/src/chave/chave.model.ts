import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Sala } from '../sala/sala.model';
import { MovimentacaoChave } from '../movimentacao-chaves/movimentacao-chaves.model';

@Table({ tableName: 'chaves' })
export class Chave extends Model<Chave> {
  @ApiProperty({ example: 1, description: 'ID da chave (autogerado)' })
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @ApiProperty({ example: 'CHV-001', description: 'Código único da chave' })
  @Column({ type: DataType.STRING, unique: true })
  declare codigo_identificador: string;

  @ApiProperty({ example: 5, description: 'ID da sala associada' })
  @Column(DataType.INTEGER)
  declare espaco_id: number;

  @ApiProperty({
    example: true,
    description: 'Indica se a chave está disponível',
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare disponivel: boolean;

  @ApiProperty({
    example: 'Está com a recepção',
    description: 'Observações gerais sobre a chave',
  })
  @Column(DataType.TEXT)
  declare observacoes: string;

  // RELACIONAMENTOS

  @ForeignKey(() => Sala)
  @Column(DataType.INTEGER)
  declare sala_id: number;

  @BelongsTo(() => Sala)
  declare sala: Sala;

  @HasMany(() => MovimentacaoChave)
  declare movimentacoes_chaves: MovimentacaoChave[];
}
