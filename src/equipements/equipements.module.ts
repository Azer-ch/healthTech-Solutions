import { Module } from '@nestjs/common';
import { EquipementsService } from './equipements.service';
import { EquipementsController } from './equipements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipement } from './entities/equipement.entity';

@Module({
  controllers: [EquipementsController],
  providers: [EquipementsService],
  imports: [TypeOrmModule.forFeature([Equipement])],
  exports:[EquipementsService]
})
export class EquipementsModule {}
