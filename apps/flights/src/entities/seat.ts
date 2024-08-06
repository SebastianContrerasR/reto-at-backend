import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Flight } from "./flight";

export enum SeatStatus {
  FREE = 'free',
  BOOKED = 'booked',
}

@Entity()
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  price: number;

  @Column()
  status: string;

  @ManyToOne(() => Flight, (flight) => flight.seats, { cascade: true })
  flight: Flight;

  isFree(): boolean {
    return this.status === SeatStatus.FREE;
  }
}