import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';

@ApiTags('OAuth2')
@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOAuth2([], 'GoogleOAuth2')
  googleAuth() {
    // redirige a Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOAuth2([], 'GoogleOAuth2')
  googleAuthRedirect(@Req() req) {
    return { message: 'Login exitoso con Google', user: req.user };
  }
}
