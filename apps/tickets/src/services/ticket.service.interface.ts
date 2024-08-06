import { CreateTicketDto } from '../usecases/create-ticket/dtos/create-ticket-dto';

export interface TicketServiceInterface {
  createTicket(body: CreateTicketDto): Promise<void>;
}
