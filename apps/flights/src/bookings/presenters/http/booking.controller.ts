import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BookingService } from '../../application/booking.service';
import { CreateBookingCommand } from '../../application/dto/create-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(new CreateBookingCommand(createBookingDto.idUser, createBookingDto.idSeats));
  }

  @MessagePattern('findAllBooking')
  findAll() {
    return this.bookingService.findAll();
  }

  // @MessagePattern('updateBooking')
  // update(@Payload() updateBookingDto: UpdateBookingDto) {
  //   return this.bookingService.update(updateBookingDto.id, updateBookingDto);
  // }
}
