import { IsEmail, IsNumber, IsString } from 'class-validator'

export class ContactDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  phone: string
}
