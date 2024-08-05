import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeatEntity } from "./entities/seat.entity";
import { SeatRepository } from "../../../application/ports/seat.repository";
import { OrmSeatRepository } from "./repositories/seat.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([SeatEntity]),
    ],
    providers: [
        {
            provide: SeatRepository,
            useClass: OrmSeatRepository,
        }
    ],
    exports: [
        SeatRepository,
    ],
})
export class OrmPersistenceModule { }