import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ticket } from './ticket';

@Entity()
export class TicketItem {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public seatCode: string;

  @Column('decimal')
  public price: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketItems)
  public ticket: Ticket;

}
