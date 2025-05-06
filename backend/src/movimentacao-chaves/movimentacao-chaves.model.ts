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

import { Chave } from '../chave/chave.model';
import { Usuario } from '../usuario/usuario.model';

@Table({ tableName: 'movimentacoes_chaves' })
export class MovimentacaoChave extends Model<MovimentacaoChave> {
  @ApiProperty({ example: 1, description: 'ID da movimentação' })
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @ApiProperty({ example: 2, description: 'ID da chave movimentada' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare chave_id: number;

  @ApiProperty({ example: 5, description: 'ID do usuário que retirou a chave' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare usuario_id: number;

  @ApiProperty({
    example: '2025-04-15T09:00:00',
    description: 'Data e hora da retirada da chave',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  declare data_retirada: Date;

  @ApiProperty({
    example: '2025-04-15T15:00:00',
    description: 'Data e hora da devolução da chave',
  })
  @Column({ type: DataType.DATE })
  declare data_devolucao: Date;

  @ApiProperty({
    example: 8,
    description: 'ID do responsável pela entrega da chave',
  })
  @Column({ type: DataType.INTEGER })
  declare responsavel_entrega: number;

  @ApiProperty({
    example: 9,
    description: 'ID do responsável pelo recebimento da chave',
  })
  @Column({ type: DataType.INTEGER })
  declare responsavel_recebimento: number;

  @ApiProperty({ example: 'Chave emprestada para manutenção elétrica' })
  @Column(DataType.TEXT)
  declare observacoes: string;

  // RELACIONAMENTOS

  @ForeignKey(() => Chave)
  @Column(DataType.INTEGER)
  declare fk_chave: number;

  @BelongsTo(() => Chave)
  declare chave: Chave;

  @ForeignKey(() => Usuario)
  @Column(DataType.INTEGER)
  declare fk_usuario: number;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;
}
