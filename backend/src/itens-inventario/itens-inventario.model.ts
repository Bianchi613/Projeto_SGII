import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { CreationOptional } from 'sequelize';

import { Instituicao } from '../instituicao/instituicao.model';

@Table({ tableName: 'itens_inventario' })
export class ItemInventario extends Model<ItemInventario> {
  @ApiProperty({ example: 1, description: 'ID do item (autogerado)' })
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @ApiProperty({ example: 'Projetor Epson X100', description: 'Nome do item' })
  @Column({ type: DataType.STRING(100), allowNull: false })
  declare nome_item: string;

  @ApiProperty({
    example: 'Projetor multimídia Full HD',
    description: 'Descrição detalhada do item',
  })
  @Column(DataType.TEXT)
  declare descricao?: string;

  @ApiProperty({
    example: '123456789BR',
    description: 'Número de patrimônio do item',
  })
  @Column({ type: DataType.STRING(50), unique: true })
  declare numero_patrimonio: string;

  @ApiProperty({
    example: 'Sala 101 - Bloco A',
    description: 'Localização atual do item',
  })
  @Column({ type: DataType.STRING(100) })
  declare localizacao_atual: string;

  @ApiProperty({ example: 2, description: 'Quantidade disponível' })
  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  declare quantidade: number;

  @ApiProperty({
    example: 'bom',
    description: 'Estado de conservação: novo, bom, danificado, etc.',
  })
  @Column({ type: DataType.STRING(30) })
  declare estado_conservacao: string;

  @ApiProperty({
    example: '2024-12-01',
    description: 'Data de aquisição do item',
  })
  @Column(DataType.DATE)
  declare data_aquisicao: Date;

  @ApiProperty({
    example: 1,
    description: 'ID da instituição que possui o item',
  })
  @ForeignKey(() => Instituicao)
  @Column({ field: 'instituicao_id', type: DataType.INTEGER, allowNull: false })
  declare instituicaoId: number;

  @BelongsTo(() => Instituicao)
  declare instituicao: Instituicao;
}
