import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightServiceInterface } from '../../services/flight/flight.service.interface';

@Controller()
export class FindFlightByIdController {
  constructor(
    @Inject('flight-service')
    private readonly service: FlightServiceInterface,
  ) { }

  @MessagePattern('flights.flights.find-by-id')
  async findFlightById(@Payload() message: { id: string }) {
    console.info('Flights Service: Find flight by id');
    const flight = await this.service.findById(message.id);
    console.info(flight);
    return [flight];
  }
}
