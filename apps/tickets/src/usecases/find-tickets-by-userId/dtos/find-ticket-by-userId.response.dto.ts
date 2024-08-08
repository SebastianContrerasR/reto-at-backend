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

class TicketUser {
    name: string;
}

export class FindTicketByUserIdResponseDto {
    constructor(ticket: Ticket, flight: Flight, user: TicketUser) {
        this.id = ticket.id;
        this.user = user;
        this.flight = flight;
        this.createdAt = ticket.createdAt;
        this.status = ticket.status;
        this.ticketItems = ticket.ticketItems
    }

    id: string;
    user: TicketUser;
    flight: Flight;
    createdAt: Date;
    status: string;
    ticketItems: TicketItemDto[];
}