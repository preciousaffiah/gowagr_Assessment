import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  fname: string;

  @IsString()
  @IsNotEmpty()
  lname: string;

  @IsNotEmpty()
  @IsMobilePhone
  ()
  mobile: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @IsString()
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
