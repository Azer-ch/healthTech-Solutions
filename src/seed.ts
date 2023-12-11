import { NestFactory } from '@nestjs/core';
import { SeedService } from './seed/seed.service';
import * as dotenv from 'dotenv';
import { SeedModule } from './seed/seed.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(SeedModule);
  const seedService = app.get(SeedService);
  await seedService.seedDatabase();
}

bootstrap();
