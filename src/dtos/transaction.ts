import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class TransferDto {
  @IsString()
  @IsNotEmpty()
  recipientId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(10, { message: 'Amount must be greater than 10' })
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
