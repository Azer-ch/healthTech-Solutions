import { Injectable } from '@nestjs/common';
import { CreateEquipementDto } from './dto/create-equipement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipement } from './entities/equipement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EquipementsService {
  constructor(
    @InjectRepository(Equipement)
    private equipementRepo: Repository<Equipement>,
  ) {}

  async create(createEquipementDto: CreateEquipementDto) {
    const equipment = this.equipementRepo.create(createEquipementDto);
    return await this.equipementRepo.save(equipment);
  }

  findAll() {
    return this.equipementRepo.find();
  }

  findOne(id:string) {
    return this.equipementRepo.findOne({ where:{id},relations:['appointments'] });
  }
  isAvailable(equipment: Equipement , date:Date){
    return !equipment.appointments.some((appointement)=> new Date(appointement.date).getTime() === new Date(date).getTime());
  }
}
