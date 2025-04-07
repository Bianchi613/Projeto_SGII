// src/sala/sala.model.ts

import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'salas' })
export class Sala extends Model<Sala> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @Column(DataType.STRING)
  declare nome: string;

  @Column(DataType.STRING)
  declare tipo: string;

  @Column(DataType.INTEGER)
  declare capacidade: number;

  @Column(DataType.JSONB)
  declare recursos: Record<string, boolean>;

  @Column(DataType.INTEGER)
  declare instituicao_id: number;
}
