import { Seat } from "../../domain/seat";

export abstract class SeatRepository {
    abstract findById(id: string): Promise<Seat>;
    abstract findByFlightId(id: string): Promise<Seat[]>;
    abstract save(seat: Seat): Promise<Seat>;
}