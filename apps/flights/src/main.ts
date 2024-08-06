import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: config().services.flights.clientId,
        brokers: [config().broker],
      },
      consumer: {
        groupId: config().services.flights.groupId,
      },
    },
  });

  app.listen();
}
bootstrap();
