import { Injectable,
     UnauthorizedException//Importamos UnauthorizedException para manejar errores de autenticacion
     } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';//Con esto generamos los tokens JWT
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import * as bcrypt from 'bcrypt';

//Con este Injectable queremos primero accedemos a la tabla usuarios para buscar por email y luego comparar la contraseña hasheada. Despues de
//autenticar al usuario, generamos los tokens JWT (access y refresh) con la informacion del usuario(payload).

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)           //Inyectamos el repositorio de Usuario para acceder a la base de datos de la tabla Usuario.
    private readonly usuarioRepo: Repository<Usuario>,     //Repositorio de Usuario
    private readonly jwtService: JwtService,          //Servicio de JWT para generar y verificar tokens
  ) {}

  async validateUser(email: string, password: string): Promise<Usuario> { //Funcion para validar usuario
    const normalizedEmail = email.trim().toLowerCase();

    const usuario = await this.usuarioRepo.findOne({
      where: { email: normalizedEmail },
      relations: ['role'], // ✅ carga la relación para que usuario.role.name esté disponible
    });

    if (!usuario) throw new UnauthorizedException('Usuario no encontrado'); //Si no lo encuentra con findOne, lanza error de no encontrado.

    const isMatch = await bcrypt.compare(password, usuario.password);        //Cuando encuentra el usuario, comparamos la contraseña hasheada con la proporcionada
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    return usuario;    //Si todo es correcto, retornamos el usuario para poder generar el token
  }

  async generateTokens(usuario: Usuario) {    //Funcion para generar tokens JWT con el usuario validado
    const payload = {       //Guardamos en el payload el id, email y role del usuario
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role.name,
    };

    const accessToken = this.jwtService.sign(payload, { //this.jwtService.sign genera el token con el payload con su clave secreta y tiempo de expiracion.
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, { //Generamos el refresh token con mayor tiempo de expiracion con su respectiva clave secreta.
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {    //Retornamos ambos tokens que seran utilizados para darle permiso de acceso al usuario dependiendo del rol.
      accessToken,
      refreshToken,
    };
  }
}


