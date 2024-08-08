import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Flight } from "./flight";

export enum SeatStatus {
  FREE = 'free',
  BOOKED = 'booked',
}

@Entity()
export class Seat {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  price: number;

  @Column()
  status: string;

  @ManyToOne(() => Flight, (flight) => flight.seats)
  flight: Flight;

  @Column({ nullable: true })
  userId: string;

  isFree(): boolean {
    return this.status === SeatStatus.FREE;
  }
}