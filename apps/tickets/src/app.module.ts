import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from './config';
import { TicketService } from './services/ticket.service';
import { CreateTicketController } from './usecases/create-ticket/create-ticket.controller';
import { CreateTicketSaga } from './usecases/create-ticket/saga/create-ticket.saga';
import { CheckSeatsFreeStep } from './usecases/create-ticket/saga/steps/check-seats-free.step';
import { ConfirmTicketStep } from './usecases/create-ticket/saga/steps/confirm-ticket.step';
import { CreateTicketStep } from './usecases/create-ticket/saga/steps/create-ticket.step';
import { ProcessPaymentStep } from './usecases/create-ticket/saga/steps/process-payment.step';
import { ReserveSeatsStep } from './usecases/create-ticket/saga/steps/reserve-seats.step';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket';
import { TicketItem } from './entities/ticket-item';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: config().services.flights.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: config().services.tickets.clientId,
            brokers: [config().broker],
          },
          consumer: {
            groupId: config().services.flights.groupId,
          },
        },
      },
      {
        name: config().services.payments.name,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: config().services.tickets.clientId,
            brokers: [config().broker],
          },
          consumer: {
            groupId: config().services.payments.groupId,
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().postgres.host,
      port: config().postgres.port,
      username: config().postgres.username,
      password: config().postgres.password,
      database: config().postgres.database,
      entities: [Ticket, TicketItem],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Ticket, TicketItem]),
  ],
  controllers: [CreateTicketController],
  providers: [
    {
      provide: 'create-ticket-saga',
      useClass: CreateTicketSaga,
    },
    {
      provide: 'ticket-service',
      useClass: TicketService,
    },

    {
      provide: 'create-ticket-step',
      useClass: CreateTicketStep,
    },
    {
      provide: 'check-seats-free',
      useClass: CheckSeatsFreeStep,
    },
    {
      provide: 'reserve-seats',
      useClass: ReserveSeatsStep,
    },
    {
      provide: 'process-payment',
      useClass: ProcessPaymentStep,
    },
    {
      provide: 'confirm-ticket',
      useClass: ConfirmTicketStep,
    },
  ],
})
export class AppModule { }
