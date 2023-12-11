import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

@Injectable()
export class PatientsService {
  constructor(@InjectRepository(Patient) private patientRepo: Repository<Patient>) {}
  async create(createPatientDto: CreatePatientDto) {
    const patient = this.patientRepo.create(createPatientDto);
    return await this.patientRepo.save(patient);
  }

  async findAll() {
    return await this.patientRepo.find();
  }

  async findOne(id: string) {
    const patient = await this.patientRepo.findOne({where:{id},relations:['appointments']});

    return patient;
  }
  isAvailable(patient: Patient,date:Date){
    return patient.appointments.every((appointement)=> {
      return new Date(appointement.date).getTime() !== new Date(date).getTime()}
      );
  }
}
