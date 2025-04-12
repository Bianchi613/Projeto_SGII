// src/chave/chave.model.ts

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Sala } from '../sala/sala.model';

@Table({ tableName: 'chaves' })
export class Chave extends Model<Chave> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING, unique: true })
  declare codigo_identificador: string;

  @ForeignKey(() => Sala)
  @Column(DataType.INTEGER)
  declare espaco_id: number;

  @BelongsTo(() => Sala)
  declare sala: Sala;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare disponivel: boolean;

  @Column(DataType.TEXT)
  declare observacoes: string;
}
