import { Body, Controller, Get, Post, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiBearerAuth,
  ApiOAuth2,
  ApiExcludeEndpoint
} from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión', description: 'Autentica un usuario con email y contraseña' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Inicio de sesión exitoso',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' },
        refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' },
        user: { 
          type: 'object',
          properties: {
            id: { type: 'string', example: '60d0fe4f5311236168a109ca' },
            email: { type: 'string', example: 'usuario@ejemplo.com' },
            name: { type: 'string', example: 'Nombre Usuario' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Credenciales inválidas' 
  })
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refrescar token', description: 'Obtener un nuevo access token usando un refresh token' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Tokens actualizados exitosamente',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' },
        refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Refresh token inválido o expirado' 
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { 
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          description: 'Refresh token previamente emitido'
        }
      },
      required: ['refreshToken']
    }
  })
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Iniciar autenticación con Google', deprecated: true })
  @ApiResponse({ status: HttpStatus.FOUND, description: 'Redirige a la página de autenticación de Google' })
  @ApiExcludeEndpoint() // Excluimos este endpoint de la documentación
  googleAuth() {
    // La autenticación con Google redirige automáticamente
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Callback de autenticación con Google', deprecated: true })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Autenticación con Google exitosa',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' },
        refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' },
        user: { 
          type: 'object',
          properties: {
            id: { type: 'string', example: '60d0fe4f5311236168a109ca' },
            email: { type: 'string', example: 'usuario@gmail.com' },
            name: { type: 'string', example: 'Nombre Usuario' },
            provider: { type: 'string', example: 'google' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Autenticación con Google fallida' 
  })
  @ApiExcludeEndpoint() // Excluimos este endpoint de la documentación
  async googleCallback(@Req() req: any) {
    const user = req.user;
    return this.authService.issueTokensForUser(user);
  }
}
