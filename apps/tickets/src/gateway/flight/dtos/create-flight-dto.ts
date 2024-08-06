import { IsDateString, IsNumber, IsString, Min } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  departure: string;

  @IsString()
  arrival: string;

  @IsDateString()
  departureDate: string;

  @IsDateString()
  arrivalDate: string;

  @IsNumber()
  @Min(1)
  nroSeats: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  priceSeats: number;
}
