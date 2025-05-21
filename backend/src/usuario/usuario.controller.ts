import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.model';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  })
  @ApiResponse({ status: 500, description: 'Erro interno ao buscar usuários' })
  async findAll(): Promise<Usuario[]> {
    try {
      return await this.usuarioService.findAll();
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao buscar usuários',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(@Param('id') id: number): Promise<Usuario> {
    try {
      return await this.usuarioService.findOne(id);
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Usuário não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({
    description:
      'Dados para criação do usuário (senha será criptografada automaticamente)',
    schema: {
      example: {
        nome: 'João da Silva',
        email: 'joao@email.com',
        senha: 'minhasenha123',
        cargo: 'Administrador',
        instituicao_id: 2,
        nivel_acesso: 1,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao criar usuário' })
  async create(@Body() data: any): Promise<Usuario> {
    try {
      return await this.usuarioService.create(data); // <- aqui o service deve gerar o hash
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao criar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    description:
      'Dados para atualização do usuário (senha será recriptografada se fornecida)',
    schema: {
      example: {
        nome: 'João da Silva Atualizado',
        email: 'joao@atualizado.com',
        senha: 'novasenha456', // opcional — atualizará o hash se fornecida
        cargo: 'Supervisor',
        instituicao_id: 3,
        nivel_acesso: 2,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar usuário' })
  async update(@Param('id') id: number, @Body() data: any): Promise<Usuario> {
    try {
      return await this.usuarioService.update(id, data); // <- o service deve tratar o hash
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao atualizar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido com sucesso',
    schema: {
      example: {
        message: 'Usuário removido com sucesso',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Erro ao remover usuário' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.usuarioService.delete(id);
      return { message: 'Usuário removido com sucesso' };
    } catch (error: unknown) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao remover usuário',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
