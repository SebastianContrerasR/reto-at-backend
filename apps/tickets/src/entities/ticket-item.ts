import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Ticket } from './ticket';

@Entity()
export class TicketItem {
  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  public seatCode: string;

  @Column('decimal')
  public price: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketItems)
  public ticket: Ticket;

}
