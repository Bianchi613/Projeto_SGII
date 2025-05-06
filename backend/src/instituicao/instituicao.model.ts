import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { CreationOptional } from 'sequelize';

import { Sala } from '../sala/sala.model';
import { Usuario } from '../usuario/usuario.model';
import { ItemInventario } from '../itens-inventario/itens-inventario.model';

@Table({ tableName: 'instituicoes' })
export class Instituicao extends Model<Instituicao> {
  @ApiProperty({ example: 1, description: 'ID da instituição (autogerado)' })
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @ApiProperty({
    example: 'Universidade Federal',
    description: 'Nome da instituição',
  })
  @Column({ type: DataType.STRING(100), allowNull: false })
  declare nome: string;

  @ApiProperty({
    example: 'escola',
    description: 'Tipo da instituição (empresa, escola, laboratório, etc.)',
    required: false,
  })
  @Column({ type: DataType.STRING(50), allowNull: true })
  declare tipo?: string;

  @ApiProperty({
    example: '12.345.678/0001-99',
    description: 'CNPJ ou outro código identificador',
  })
  @Column({ type: DataType.STRING(30), unique: true })
  declare cnpj_ou_codigo: string;

  @ApiProperty({
    example: 'Rua das Acácias, 123',
    description: 'Endereço da instituição',
    required: false,
  })
  @Column(DataType.TEXT)
  declare endereco?: string;

  @ApiProperty({
    example: '(11) 91234-5678',
    description: 'Telefone da instituição',
    required: false,
  })
  @Column({ type: DataType.STRING(20), allowNull: true })
  declare telefone?: string;

  @ApiProperty({
    example: 'contato@instituicao.org',
    description: 'Email institucional',
    required: false,
  })
  @Column({ type: DataType.STRING(100), allowNull: true })
  declare email?: string;

  // RELACIONAMENTOS

  @ApiProperty({ type: () => [Sala] })
  @HasMany(() => Sala)
  declare salas: Sala[];

  @ApiProperty({ type: () => [Usuario] })
  @HasMany(() => Usuario)
  declare usuarios: Usuario[];

  @ApiProperty({ type: () => [ItemInventario] })
  @HasMany(() => ItemInventario)
  declare itens_inventario: ItemInventario[];
}
