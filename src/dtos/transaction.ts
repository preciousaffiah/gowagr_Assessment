import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class TransferDto {
  @IsString()
  @IsNotEmpty()
  recipientId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class TransferHistoryDto {
  @IsDateString()
  @IsOptional()
  date: string;
}
