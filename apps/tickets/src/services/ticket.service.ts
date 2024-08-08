import { Inject, Injectable } from '@nestjs/common';
import { Ticket, TicketStatus } from '../entities/ticket';
import { CreateTicketDto } from '../usecases/create-ticket/dtos/create-ticket-dto';
import { CreateTicketSaga } from '../usecases/create-ticket/saga/create-ticket.saga';
import { TicketServiceInterface } from './ticket.service.interface';
import { TicketItem } from '../entities/ticket-item';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TicketService implements TicketServiceInterface {
  constructor(
    @Inject('create-ticket-saga') private saga: CreateTicketSaga,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) { }

  async createTicket(body: CreateTicketDto, userId: string): Promise<void> {
    const ticket = new Ticket();
    ticket.id = randomUUID();
    ticket.userId = userId;
    ticket.flightId = body.flightId;
    ticket.status = TicketStatus.PENDING;
    ticket.createdAt = new Date();
    ticket.ticketItems = body.ticketItems.map((ticketItem) => {
      const ticketItemEntity = new TicketItem();
      ticketItemEntity.id = randomUUID();
      ticketItemEntity.seatCode = ticketItem.seatCode;
      ticketItemEntity.price = ticketItem.price;
      return ticketItemEntity;
    });

    await this.saga.execute(ticket);
  }

  async findTicketsByUserId(userId: string): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      where: {
        userId,
      },
      relations: ['ticketItems'],
      order: {
        createdAt: 'DESC',
        ticketItems: {
          seatCode: 'ASC'
        }
      }
    });
  }
}
