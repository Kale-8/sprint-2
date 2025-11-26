import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';  //Importamos para obtener el token despues de validar el usuario
import { LoginDto } from './login.dto';  //DTO para recibir email y password en el login desde el frontend
import { AuthGuard } from '@nestjs/passport';   //Importamos el AuthGuard de passport para usar Google OAuth2
import { ApiTags } from '@nestjs/swagger';   //Importamos ApiTags para documentacion Swagger(agrupar los endpoints)

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} //Inyectamos el AuthService para usar sus metodos en el controlador, osea para usar el token al logiarse.

  //En este post /login recibimos el email y password desde el frontend para validar el usuario y generar los tokens JWT y retornarlos.
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const usuario = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.generateTokens(usuario);
  }
  //Rutas para autenticacion con Google OAuth2
  @ApiTags('AuthGOOGLE') // Agrupa los endpoints en Swagger
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Esto redirige al login de Google automáticamente
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req) {
    // Aquí recibes el usuario validado desde GoogleStrategy
    return {
      message: 'Autenticación con Google exitosa',
      user: req.user,
   };
  }
}
