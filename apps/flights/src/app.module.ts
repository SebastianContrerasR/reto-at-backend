import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { Flight } from './entities/flight';
import { Seat } from './entities/seat';
import { FlightService } from './services/flight/flight.service';
import { SeatService } from './services/seat/seat.service';
import { CheckSeatsFreeController } from './usecases/check-seats-free/check-seats-free.controller';
import { CreateFlightsController } from './usecases/create-flights/create-flights.controller';
import { FindFlightByIdDetailsController } from './usecases/find-flight-by-id-details/find-flight-by-id-details.controller';
import { FindFlightsController } from './usecases/find-flights/find-flights.controller';
import { ReserveSeatsController } from './usecases/reserve-seats/reserve-seats.controller';
import { FindFlightByIdController } from './usecases/find-flight-by-id/find-flight-by-id.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().postgres.host,
      port: config().postgres.port,
      username: config().postgres.username,
      password: config().postgres.password,
      database: config().postgres.database,
      synchronize: true,
      entities: [Flight, Seat],
    }),
    TypeOrmModule.forFeature([Flight, Seat]),
  ],
  controllers: [
    CheckSeatsFreeController,
    ReserveSeatsController,
    CreateFlightsController,
    FindFlightsController,
    FindFlightByIdController,
    FindFlightByIdDetailsController
  ],
  providers: [
    {
      provide: 'seats-service',
      useClass: SeatService,
    },
    {
      provide: 'flight-service',
      useClass: FlightService,
    },
  ],
})
export class AppModule { }
