import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Seat } from "./seat";

@Entity()
export class Flight {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    departure: string;

    @Column()
    arrival: string;

    @Column()
    departureDate: Date;

    @Column()
    arrivalDate: Date;

    @OneToMany(() => Seat, (seat) => seat.flight, { cascade: true })
    seats: Seat[];

}