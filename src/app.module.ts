import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NursesModule } from './nurses/nurses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PatientsModule } from './patients/patients.module';
import { EquipementsModule } from './equipements/equipements.module';
@Module({
  imports: [
    NursesModule,
    PatientsModule,
    AppointmentsModule,
    EquipementsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'healthcare',
      autoLoadEntities:true,
      synchronize: true,
    }),
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
