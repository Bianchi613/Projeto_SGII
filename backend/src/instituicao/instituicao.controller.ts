import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { InstituicaoService } from './instituicao.service';
import { Instituicao } from './instituicao.model';
import { CreationAttributes } from 'sequelize';

@ApiTags('Instituições')
@Controller('instituicoes')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as instituições' })
  @ApiResponse({
    status: 200,
    description: 'Lista de instituições retornada com sucesso.',
    schema: {
      example: [
        {
          id: 1,
          nome: 'Universidade Federal',
          tipo: 'escola',
          cnpj_ou_codigo: '12.345.678/0001-99',
          endereco: 'Rua das Acácias, 123',
          telefone: '(11) 91234-5678',
          email: 'contato@uf.edu.br',
        },
      ],
    },
  })
  findAll(): Promise<Instituicao[]> {
    return this.instituicaoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar instituição por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da instituição' })
  @ApiResponse({
    status: 200,
    description: 'Instituição encontrada.',
    schema: {
      example: {
        id: 1,
        nome: 'Universidade Federal',
        tipo: 'escola',
        cnpj_ou_codigo: '12.345.678/0001-99',
        endereco: 'Rua das Acácias, 123',
        telefone: '(11) 91234-5678',
        email: 'contato@uf.edu.br',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Instituição não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Instituicao | null> {
    return this.instituicaoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova instituição' })
  @ApiBody({
    schema: {
      example: {
        nome: 'Instituto de Pesquisa X',
        tipo: 'laboratório',
        cnpj_ou_codigo: '98.765.432/0001-00',
        endereco: 'Av. das Ciências, 987',
        telefone: '(21) 99999-9999',
        email: 'contato@instituto.org',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Instituição criada com sucesso.',
    schema: {
      example: {
        id: 2,
        nome: 'Instituto de Pesquisa X',
        tipo: 'laboratório',
        cnpj_ou_codigo: '98.765.432/0001-00',
        endereco: 'Av. das Ciências, 987',
        telefone: '(21) 99999-9999',
        email: 'contato@instituto.org',
      },
    },
  })
  create(@Body() data: CreationAttributes<Instituicao>): Promise<Instituicao> {
    return this.instituicaoService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar instituição existente' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da instituição a ser atualizada',
  })
  @ApiBody({
    schema: {
      example: {
        nome: 'Universidade Federal Atualizada',
        tipo: 'escola',
        cnpj_ou_codigo: '12.345.678/0001-99',
        endereco: 'Rua Nova, 456',
        telefone: '(11) 91234-0000',
        email: 'atendimento@ufatualizada.edu.br',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Instituição atualizada com sucesso.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Instituicao>,
  ): Promise<[affectedCount: number]> {
    return this.instituicaoService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover instituição por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da instituição a ser removida',
  })
  @ApiResponse({
    status: 200,
    description: 'Instituição removida com sucesso.',
    schema: {
      example: {
        success: true,
      },
    },
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: boolean }> {
    const result = await this.instituicaoService.remove(id);
    return { success: result > 0 };
  }
}
