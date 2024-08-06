import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'apps/tickets/src/entities/ticket';
import { Repository } from 'typeorm';
import { Step } from './step';

@Injectable()
export class ConfirmTicketStep extends Step<Ticket, void> {
  constructor(
    @InjectRepository(Ticket)
    private repository: Repository<Ticket>,
  ) {
    super();
    this.name = 'Confirm Ticket Step';
  }

  invoke(ticket: Ticket): Promise<void> {
    ticket.confirm();
    this.repository.save(ticket);
    return;
  }

  withCompenstation(ticket: Ticket): Promise<void> {
    ticket.cancel();
    this.repository.save(ticket);
    return;
  }
}
