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

  @ForeignKey(() => Chave)
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ApiProperty({ example: 2, description: 'ID da chave movimentada' })
  declare chave_id: number;

  @BelongsTo(() => Chave)
  declare chave: Chave;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: true })
  @ApiProperty({ example: 5, description: 'ID do usuário que retirou a chave' })
  declare usuario_id: number;

  @BelongsTo(() => Usuario, 'usuario_id')
  declare usuario: Usuario;

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

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER })
  @ApiProperty({
    example: 8,
    description: 'ID do responsável pela entrega da chave',
  })
  declare responsavel_entrega: number;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER })
  @ApiProperty({
    example: 9,
    description: 'ID do responsável pelo recebimento da chave',
  })
  declare responsavel_recebimento: number;

  @ApiProperty({ example: 'Chave emprestada para manutenção elétrica' })
  @Column(DataType.TEXT)
  declare observacoes: string;
}
