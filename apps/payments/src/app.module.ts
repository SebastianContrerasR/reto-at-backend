import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import config from './config';
import { ProcessPaymentController } from './usecases/process-payment/process-payment.controller';
import { PaymentService } from './services/payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment';

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
      entities: [Payment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [ProcessPaymentController],
  providers: [
    {
      provide: 'payment-service',
      useClass: PaymentService,
    },
  ],
})
export class AppModule { }
