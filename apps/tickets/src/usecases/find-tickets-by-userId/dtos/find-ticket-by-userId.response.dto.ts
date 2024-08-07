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
    constructor(ticket: Ticket, flight: Flight) {
        this.id = ticket.id;
        this.userId = ticket.userId;
        this.flight = flight;
        this.createdAt = ticket.createdAt;
        this.status = ticket.status;
        this.ticketItems = ticket.ticketItems
    }

    id: string;
    userId: string;
    flight: Flight;
    createdAt: Date;
    status: string;
    ticketItems: TicketItemDto[];
}