// src/usuario/usuario.model.ts

import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'usuarios' })
export class Usuario extends Model<Usuario> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @Column(DataType.STRING)
  declare nome: string;

  @Column({ type: DataType.STRING, unique: true })
  declare email: string;

  @Column(DataType.STRING)
  declare senha_hash: string;

  @Column(DataType.STRING)
  declare cargo: string;

  @Column(DataType.INTEGER)
  declare instituicao_id: number;

  @Column(DataType.INTEGER)
  declare nivel_acesso: number;
}
