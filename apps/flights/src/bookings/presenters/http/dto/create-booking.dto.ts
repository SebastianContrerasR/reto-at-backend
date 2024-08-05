import { IsUUID } from "class-validator";

export class CreateBookingDto {
    @IsUUID()
    idUser: string;
    @IsUUID("4", { each: true })
    idSeats: string[];
}
