import { Module } from '@nestjs/common';
import config from './config';
import { ConfigModule } from '@nestjs/config';
import { CheckProductAvailibityController } from './usecases/check-seats-free/check-seats-free.controller';
import { UpdateStockController } from './usecases/reserve-seats/reserve-seats.controller';
import { SeatService } from './services/seat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight';
import { Seat } from './entities/seat';

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
  controllers: [CheckProductAvailibityController, UpdateStockController],
  providers: [
    {
      provide: 'seats-service',
      useClass: SeatService,
    },
  ],
})
export class AppModule { }
