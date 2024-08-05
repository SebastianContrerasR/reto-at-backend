import { Seat } from "apps/flights/src/bookings/domain/seat";
import { SeatEntity } from "../entities/seat.entity";
import { SeatStatus } from "apps/flights/src/bookings/domain/valueObjects/seatStatus";

export class SeatMapper {

    static toDomain(entity: SeatEntity): Seat {
        const seatStatus = new SeatStatus(entity.status as 'free' | 'booked' | 'paid');
        return new Seat(
            entity.id,
            entity.code,
            entity.price,
            seatStatus,
            entity.idFlight,
        );
    }

    static toPersistence(seat: Seat): SeatEntity {
        const entity = new SeatEntity();
        entity.id = seat.id;
        entity.code = seat.code;
        entity.price = seat.price;
        entity.status = seat.status.value;
        entity.idFlight = seat.idFlight;
        return entity;
    }
}