import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { CheckNurseDto } from './dto/check-nurse.dto';
import {CheckEquipmentDto} from "./dto/check-equipment.dto";
import {CheckPatientDto} from "./dto/check-patient.dto";


@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('appointment/:id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }
  @Get('patient/:patientId')
  findByPatientId(@Param('patientId') patientId : string){
    return this.appointmentsService.findByPatientId(patientId);
  }
  // @Get('nurse/:nurseId')
  // findByNurseId(@Param('nurseId') nurseId : string){
  //   return this.appointmentsService.findByNurseId(nurseId);
  // }
  @Post('/nurse/check')
  checkNurse(@Body() checkNurseDto: CheckNurseDto) {
    return this.appointmentsService.checkNurse(checkNurseDto);
  }

  @Post('/equipment/check')
  checkEquipment(@Body() checkEquipmentDto: CheckEquipmentDto) {
    return this.appointmentsService.checkEquipment(checkEquipmentDto);
  }
  @Post('/patient/check')
  checkPatient(@Body() checkPatientDto: CheckPatientDto) {
    return this.appointmentsService.checkPatient(checkPatientDto);
  }
}
