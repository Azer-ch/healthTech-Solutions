import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import {PatientsModule} from './../patients/patients.module'
import {NursesModule} from './../nurses/nurses.module'
import {EquipementsModule} from './../equipements/equipements.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './../patients/entities/patient.entity';
import { Nurse } from './../nurses/entities/nurse.entity';
import { Equipement } from './../equipements/entities/equipement.entity';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { Appointment } from 'src/appointments/entities/appointment.entity';
@Module({
  providers: [SeedService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'healthcare',
      entities: [__dirname + '/**/*.entity.ts'],
      autoLoadEntities:true,
      synchronize: true,
    }),
    PatientsModule,
    NursesModule,
    EquipementsModule,
    AppointmentsModule,
    TypeOrmModule.forFeature([
      Patient,
      Nurse,
      Equipement,
      Appointment
    ])
  ]
})
export class SeedModule {}
