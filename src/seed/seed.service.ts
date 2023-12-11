// seed.command.ts
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { data } from './data';
import { PatientsService } from 'src/patients/patients.service';
import { NursesService } from 'src/nurses/nurses.service';
import { EquipementsService } from 'src/equipements/equipements.service';
@Injectable()
export class SeedService {
  constructor(
    private patientsService: PatientsService, 
    private nursesService: NursesService, 
    private equipmentsService: EquipementsService) {}

  async seedDatabase(){
    const {patients, nurses, equipments} = data
    await Promise.all(patients.map(patient => this.patientsService.create(patient)));
    await Promise.all(equipments.map(equipment => this.equipmentsService.create(equipment)));
    await Promise.all(nurses.map(nurse => this.nursesService.create(nurse)));
  }
}
