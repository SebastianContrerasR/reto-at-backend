import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightsService {
  getHello(): string {
    return 'Hello from Flights Service!';
  }
}
