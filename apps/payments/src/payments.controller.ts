import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Get()
  getHello(): string {
    return this.paymentsService.getHello();
  }

  @MessagePattern('seats.booked')
  async handleSeatsBooked(@Payload() payload: { idUser: string, amount: number }) {
    console.log(`seats.booked: ${payload.idUser}, ${payload.amount}`);
  }
}
