import { Controller, Get, Param } from '@nestjs/common';
import { EquipementsService } from './equipements.service';

@Controller('equipements')
export class EquipementsController {
  constructor(private readonly equipementsService: EquipementsService) {}

  @Get()
  findAll() {
    return this.equipementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipementsService.findOne(id);
  }

}
