import { Ticket } from '../entities/ticket';
import { CreateTicketDto } from '../usecases/create-ticket/dtos/create-ticket-dto';

export interface TicketServiceInterface {
  createTicket(body: CreateTicketDto, userId: string): Promise<void>;
  findTicketsByUserId(userId: string): Promise<Ticket[]>;
}
