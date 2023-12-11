import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { EquipementsService } from 'src/equipements/equipements.service';
import { NursesService } from 'src/nurses/nurses.service';
import { PatientsService } from 'src/patients/patients.service';
import { log } from 'console';
import { CheckNurseDto } from './dto/check-nurse.dto';
import {CheckEquipmentDto} from "./dto/check-equipment.dto";

@Injectable()
export class AppointmentsService {
  constructor(@InjectRepository(Appointment) private appointmentRepo: Repository<Appointment>,private patientsService: PatientsService, private nursesService: NursesService, private equipmentService: EquipementsService) {
    
  }

  async create(createAppointmentDto: CreateAppointmentDto) {
    //check nurse's availability
    const nurse = await this.nursesService.findOne(createAppointmentDto.nurseId);
    if(nurse === null) {
      throw new NotFoundException(`nurse with id: ${createAppointmentDto.nurseId} does not exist!`);
    }

    if (!this.nursesService.isAvailable(nurse, createAppointmentDto.date)) {
      throw new NotFoundException(`nurse with id: ${createAppointmentDto.nurseId} is not available!`);
    }

    // check equipment's availability
    const equipment = await this.equipmentService.findOne(createAppointmentDto.equipmentId);
    if (equipment === null){
      throw new NotFoundException(`equipment with id: ${createAppointmentDto.equipmentId} does not exist!`);
    }
    if (!this.equipmentService.isAvailable(equipment, createAppointmentDto.date)) {
      throw new NotFoundException(`equip with id: ${createAppointmentDto.nurseId} does not exist!`);
    }
    //check patient's availability
    const patient = await this.patientsService.findOne(createAppointmentDto.patientId);

    if(patient === null) {
      throw new NotFoundException(`patient with id: ${createAppointmentDto.patientId} does not exist!`);
    }

    if (!this.patientsService.isAvailable(patient, createAppointmentDto.date)) {
      throw new NotFoundException(`patient with id: ${createAppointmentDto.patientId} is not available!`);
    }
    
    const appointment = this.appointmentRepo.create(createAppointmentDto);

    appointment.patient = patient;
    appointment.nurse = nurse;
    appointment.equipement = equipment;

    return await this.appointmentRepo.save(appointment);
  }

  async findAll() {
    return await this.appointmentRepo.find();
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepo.findOneBy({id});

    if(!appointment)
      throw new NotFoundException('Appointment not found');

    return appointment;
  }
  async findByPatientId(patientId){
    return await this.appointmentRepo.findBy({patient:{id:patientId}});
  }
  async findByNurseId(nurseId){
    return await this.appointmentRepo.findBy({nurse:{id:nurseId}});
  }
  async checkNurse(checkNurseDto: CheckNurseDto){
    try {
      const nurse = await this.nursesService.findOne(checkNurseDto.nurseId);
      if (nurse === null) {
        throw new NotFoundException(`nurse with id: ${checkNurseDto.nurseId} does not exist!`);
      }

      if (!this.nursesService.isAvailable(nurse, checkNurseDto.date)) {
        throw new NotFoundException(`nurse with id: ${checkNurseDto.nurseId} is not available!`);
      }
      return {check: true};
    }catch (e) {
      return {check:false};
    }
  }

    async checkEquipment(checkEquipmentDto: CheckEquipmentDto) {
      try {
        const equipment = await this.nursesService.findOne(checkEquipmentDto.equipmentId);
        if (equipment === null) {
          throw new NotFoundException(`equipment with id: ${checkEquipmentDto.equipmentId} does not exist!`);
        }

        if (!this.equipmentService.isAvailable(equipment, checkEquipmentDto.date)) {
          throw new NotFoundException(`equipment with id: ${checkEquipmentDto.equipmentId} is not available!`);
        }
        return {check: true};
      } catch (e) {
        return {check: false};
      }
    }
}
