export class FlightResponseDto {
    id: string;
    departure: string;
    arrival: string;
    departureDate: Date;
    arrivalDate: Date;
    seats: SeatResponseDto[];
}

export class SeatResponseDto {
    id: string;
    code: string;
    price: number;
    status: string;
}