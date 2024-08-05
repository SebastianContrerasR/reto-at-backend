import { NestFactory } from '@nestjs/core';
import { FlightsModule } from './flights.module';
import { ValidationPipe } from '@nestjs/common';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.create(FlightsModule.register({ persistenceDriver: 'orm' }));

  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService)
  const port = config.get('app.port')

  const kafkaOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: config.get('kafka.clientId'),
        brokers: [config.get('kafka.broker')],
      },
      consumer: {
        groupId: config.get('kafka.consumerGroupId')
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner
      }
    }
  }

  app.connectMicroservice(kafkaOptions)
  await app.startAllMicroservices()


  await app.listen(port);
}
bootstrap();
