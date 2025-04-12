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
import { ChaveService } from './chave.service';
import { Chave } from './chave.model';

@ApiTags('Chaves')
@Controller('chaves')
export class ChaveController {
  constructor(private readonly chaveService: ChaveService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as chaves' })
  @ApiResponse({
    status: 200,
    description: 'Lista de chaves retornada com sucesso.',
    schema: {
      example: [
        {
          id: 1,
          codigo_identificador: 'CHV-001',
          espaco_id: 5,
          disponivel: true,
          observacoes: 'Está com o setor de manutenção',
        },
        {
          id: 2,
          codigo_identificador: 'CHV-002',
          espaco_id: 3,
          disponivel: false,
          observacoes: 'Perdida temporariamente',
        },
      ],
    },
  })
  findAll(): Promise<Chave[]> {
    return this.chaveService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar chave por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID da chave' })
  @ApiResponse({
    status: 200,
    description: 'Chave encontrada.',
    schema: {
      example: {
        id: 1,
        codigo_identificador: 'CHV-001',
        espaco_id: 5,
        disponivel: true,
        observacoes: 'Está com o setor de manutenção',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Chave não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Chave> {
    return this.chaveService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova chave' })
  @ApiBody({
    schema: {
      example: {
        codigo_identificador: 'CHV-003',
        espaco_id: 2,
        disponivel: true,
        observacoes: 'Nova chave criada manualmente',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Chave criada com sucesso.',
    schema: {
      example: {
        id: 3,
        codigo_identificador: 'CHV-003',
        espaco_id: 2,
        disponivel: true,
        observacoes: 'Nova chave criada manualmente',
      },
    },
  })
  create(@Body() data: Omit<Chave, 'id'>): Promise<Chave> {
    return this.chaveService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar chave existente' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da chave a ser atualizada',
  })
  @ApiBody({
    schema: {
      example: {
        codigo_identificador: 'CHV-001',
        espaco_id: 5,
        disponivel: false,
        observacoes: 'Emprestada temporariamente para manutenção',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Chave atualizada com sucesso.',
    schema: {
      example: {
        id: 1,
        codigo_identificador: 'CHV-001',
        espaco_id: 5,
        disponivel: false,
        observacoes: 'Emprestada temporariamente para manutenção',
      },
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Chave>,
  ): Promise<Chave> {
    return this.chaveService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover chave por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da chave a ser removida',
  })
  @ApiResponse({
    status: 200,
    description: 'Chave removida com sucesso.',
    schema: {
      example: {
        success: true,
      },
    },
  })
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    return this.chaveService.delete(id);
  }
}
