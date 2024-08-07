import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightServiceInterface } from '../../services/flight/flight.service.interface';

@Controller()
export class FindFlightByIdDetailsController {
  constructor(
    @Inject('flight-service')
    private readonly service: FlightServiceInterface,
  ) { }

  @MessagePattern('flights.flights.find-by-id-details')
  async findFlightById(@Payload() message: { id: string }) {
    console.info('Flights Service: Find flight by id');
    const flight = await this.service.findByIdDetails(message.id);
    console.info(flight);
    return [flight];
  }
}
