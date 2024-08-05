import { InjectRepository } from "@nestjs/typeorm";
import { SeatRepository } from "apps/flights/src/bookings/application/ports/seat.repository";
import { Seat } from "apps/flights/src/bookings/domain/seat";
import { SeatEntity } from "../entities/seat.entity";
import { Repository } from "typeorm";
import { SeatMapper } from "../mapper/seat.mapper";

export class OrmSeatRepository implements SeatRepository {

    constructor(
        @InjectRepository(SeatEntity)
        private readonly seatRepository: Repository<SeatEntity>,
    ) { }

    async findById(id: string): Promise<Seat> {
        const seat = await this.seatRepository.findOneBy({
            id
        });

        if (!seat) {
            return null;
        }

        return SeatMapper.toDomain(seat);
    }
    async findByFlightId(idFlight: string): Promise<Seat[]> {
        const entities = await this.seatRepository.find({
            where: {
                idFlight
            }
        })

        return entities.map(entity => SeatMapper.toDomain(entity));
    }
    async save(seat: Seat): Promise<Seat> {
        const entity = SeatMapper.toPersistence(seat);
        const newEntity = await this.seatRepository.save(entity);

        return SeatMapper.toDomain(newEntity);
    }

}