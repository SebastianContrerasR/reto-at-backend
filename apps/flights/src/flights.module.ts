import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookingModule } from './bookings/application/booking.module';
import { SeatsInfrastructureModule } from './bookings/infrastructure/seatsInfrastructure.module';
import { ApplicationOptions } from './common/applicationOptions.interface';
import configuration from './config/configuration';
import { CoreModule } from './core/core.module';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    KafkaModule,
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {
  static register(options: ApplicationOptions) {
    return {
      module: FlightsModule,
      imports: [
        CoreModule.forRoot(options),
        BookingModule.withInfrastructure(SeatsInfrastructureModule.use())
      ]
    }
  }
}
