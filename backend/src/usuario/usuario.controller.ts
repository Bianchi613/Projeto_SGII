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
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import { CreationAttributes } from 'sequelize';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    schema: {
      example: [
        {
          id: 1,
          nome: 'João da Silva',
          email: 'joao@email.com',
          senha_hash: '$2b$10$abc...',
          cargo: 'Administrador',
          instituicao_id: 2,
          nivel_acesso: 1,
        },
      ],
    },
  })
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    schema: {
      example: {
        id: 1,
        nome: 'João da Silva',
        email: 'joao@email.com',
        senha_hash: '$2b$10$abc...',
        cargo: 'Administrador',
        instituicao_id: 2,
        nivel_acesso: 1,
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiBody({
    schema: {
      example: {
        nome: 'Maria Oliveira',
        email: 'maria@email.com',
        senha_hash: '$2b$10$xyz...',
        cargo: 'Usuário',
        instituicao_id: 1,
        nivel_acesso: 2,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    schema: {
      example: {
        id: 2,
        nome: 'Maria Oliveira',
        email: 'maria@email.com',
        senha_hash: '$2b$10$xyz...',
        cargo: 'Usuário',
        instituicao_id: 1,
        nivel_acesso: 2,
      },
    },
  })
  create(@Body() data: CreationAttributes<Usuario>): Promise<Usuario> {
    return this.usuarioService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário existente' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do usuário a ser atualizado',
  })
  @ApiBody({
    schema: {
      example: {
        nome: 'Maria Oliveira da Silva',
        email: 'maria.oliveira@email.com',
        senha_hash: '$2b$10$nova...',
        cargo: 'Gestora',
        instituicao_id: 1,
        nivel_acesso: 1,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    schema: {
      example: {
        id: 2,
        nome: 'Maria Oliveira da Silva',
        email: 'maria.oliveira@email.com',
        senha_hash: '$2b$10$nova...',
        cargo: 'Gestora',
        instituicao_id: 1,
        nivel_acesso: 1,
      },
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Usuario>,
  ): Promise<Usuario> {
    return this.usuarioService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID do usuário a ser removido',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido com sucesso',
    schema: {
      example: { success: true },
    },
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: boolean }> {
    const success = await this.usuarioService.delete(id);
    return { success };
  }
}
