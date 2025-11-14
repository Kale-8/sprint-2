import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';  //Importamos para obtener el token despues de validar el usuario
import { LoginDto } from './login.dto';  //DTO para recibir email y password en el login desde el frontend

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} //Inyectamos el AuthService para usar sus metodos en el controlador, osea para usar el token al logiarse.

  //En este post /login recibimos el email y password desde el frontend para validar el usuario y generar los tokens JWT y retornarlos.
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const usuario = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.generateTokens(usuario);
  }
}
