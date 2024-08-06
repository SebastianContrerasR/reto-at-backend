import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'apps/tickets/src/entities/ticket';
import { Repository } from 'typeorm';
import { Step } from './step';

@Injectable()
export class CreateTicketStep extends Step<Ticket, void> {
  constructor(
    @InjectRepository(Ticket)
    private repository: Repository<Ticket>,
  ) {
    super();
    this.name = 'Create Ticket Step';
  }

  async invoke(ticket: Ticket): Promise<void> {
    this.repository.save(ticket);

    return;
  }

  withCompenstation(ticket: Ticket): Promise<void> {
    ticket.cancel();
    this.repository.update({
      id: ticket.id,
    }, {
      status: ticket.status
    });

    return;
  }
}
