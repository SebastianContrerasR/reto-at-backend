import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Seat } from "./seat";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    departure: string;

    @Column()
    arrival: string;

    @Column()
    departureDate: Date;

    @Column()
    arrivalDate: Date;

    @OneToMany(() => Seat, (seat) => seat.flight)
    seats: Seat[];

}