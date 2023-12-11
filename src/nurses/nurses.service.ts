import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Nurse } from './entities/nurse.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNurseDto } from './dto/create-nurse.dto';

@Injectable()
export class NursesService {
  constructor(@InjectRepository(Nurse) private nurseRepo: Repository<Nurse>) {}
  async create(createNurseDto : CreateNurseDto){
    const nurse = this.nurseRepo.create(createNurseDto);
    return await this.nurseRepo.save(nurse);
  }
  async findAll() {
    return await this.nurseRepo.find();
  }
  async findOne(id: string) {
    const nurse = await this.nurseRepo.findOne({where:{id},relations:['appointments']});
    return nurse;
  }
  isAvailable(nurse: Nurse , date:Date){
    return !nurse.appointments.some((appointement)=> new Date(appointement.date).getTime() === new Date(date).getTime());
  }
  async save(nurse: Nurse){
    return await this.nurseRepo.save(nurse);
  }
}
