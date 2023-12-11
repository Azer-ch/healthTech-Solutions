import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { CheckNurseDto } from './dto/check-nurse.dto';


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
  @Get('/nurse/check')
  check(@Body() checkNurseDto: CheckNurseDto) {
    
    return this.appointmentsService.checkNurse(checkNurseDto); 
  }

}
