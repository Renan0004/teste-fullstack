import { IsNotEmpty, IsString, Length } from 'class-validator';

export class TimeRecordDto {
  @IsNotEmpty({ message: 'O código do usuário é obrigatório' })
  @IsString({ message: 'O código do usuário deve ser uma string' })
  @Length(1, 50, { message: 'O código do usuário deve ter entre 1 e 50 caracteres' })
  userCode: string;
} 