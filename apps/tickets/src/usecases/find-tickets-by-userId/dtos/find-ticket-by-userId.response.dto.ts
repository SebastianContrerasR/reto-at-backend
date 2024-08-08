import { Ticket } from "apps/tickets/src/entities/ticket";

class TicketItemDto {
    id: string;
    seatCode: string;
    price: number;
}

class Flight {
    id: string;
    departure: string;
    arrival: string;
    departureDate: string;
    arrivalDate: string;
}

export class FindTicketByUserIdResponseDto {
    constructor(ticket: Ticket, flight: Flight, userName: string) {
        this.id = ticket.id;
        this.userName = userName;
        this.flight = flight;
        this.createdAt = ticket.createdAt;
        this.status = ticket.status;
        this.ticketItems = ticket.ticketItems
    }

    id: string;
    userName: string;
    flight: Flight;
    createdAt: Date;
    status: string;
    ticketItems: TicketItemDto[];
}