import { DynamicModule, Module, Type } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from '../presenters/http/booking.controller';
import { KafkaModule } from '../../kafka/kafka.module';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: BookingModule,
      imports: [infrastructureModule, KafkaModule],
    }
  }
}
