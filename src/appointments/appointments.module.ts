import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { NursesModule } from 'src/nurses/nurses.module';
import { EquipementsModule } from 'src/equipements/equipements.module';
import { Nurse } from 'src/nurses/entities/nurse.entity';
import { Equipement } from 'src/equipements/entities/equipement.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [TypeOrmModule.forFeature([Appointment,Nurse,Equipement,Patient]),NursesModule,EquipementsModule,PatientsModule],
})
export class AppointmentsModule {}
