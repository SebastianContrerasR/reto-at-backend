import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TicketItem } from './ticket-item';

export enum TicketStatus {
  PENDING = 'pending',
  CANCELED = 'canceled',
  CONFIRMED = 'confirmed',
}

@Entity()
export class Ticket {
  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  public userId: string;

  @Column()
  public flightId: string;

  @Column()
  public createdAt: Date;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.PENDING,
  })
  public status: TicketStatus;

  @OneToMany(() => TicketItem, (ticketItem) => ticketItem.ticket, { cascade: true })
  public ticketItems: TicketItem[];

  confirm() {
    this.status = TicketStatus.CONFIRMED;
  }

  cancel() {
    this.status = TicketStatus.CANCELED;
  }
}
