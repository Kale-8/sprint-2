import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from '../dto/create.usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
