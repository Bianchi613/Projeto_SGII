// src/chave/chave.model.ts

import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'chaves' })
export class Chave extends Model<Chave> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING, unique: true })
  declare codigo_identificador: string;

  @Column(DataType.INTEGER)
  declare espaco_id: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare disponivel: boolean;

  @Column(DataType.TEXT)
  declare observacoes: string;
}
