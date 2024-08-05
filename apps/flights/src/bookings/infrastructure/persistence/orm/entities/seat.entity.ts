import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SeatEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    code: string;

    @Column()
    price: number;

    @Column()
    status: string;

    @Column()
    idFlight: string;
}