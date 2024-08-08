import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @IsString()
  @ApiProperty()
  flightId: string;

  @IsNotEmpty()
  @ApiProperty({ type: () => CreateTicketItemDto, isArray: true })
  ticketItems: CreateTicketItemDto[];
}

export class CreateTicketItemDto {
  @IsString()
  @ApiProperty()
  seatCode: string;

  @IsNumber()
  @ApiProperty()
  price: number;
}
