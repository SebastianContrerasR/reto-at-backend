import { NestFactory } from '@nestjs/core';
import { FlightsModule } from './flights.module';

async function bootstrap() {
  const app = await NestFactory.create(FlightsModule);
  await app.listen(3000);
}
bootstrap();
