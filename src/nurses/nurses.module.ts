import { Module } from '@nestjs/common';
import { NursesService } from './nurses.service';
import { NursesController } from './nurses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nurse } from './entities/nurse.entity';

@Module({
  controllers: [NursesController],
  providers: [NursesService],
  imports: [TypeOrmModule.forFeature([Nurse])],
  exports:[NursesService]
})
export class NursesModule {}
