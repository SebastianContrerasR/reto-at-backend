import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import config from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: config().services.auth.clientId,
        brokers: [config().broker],
      },
      consumer: {
        groupId: config().services.auth.groupId,
      },
    },
  });
  Logger.log('llego aqui')
  app.listen();
}
bootstrap();
