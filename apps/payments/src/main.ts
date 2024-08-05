import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
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
