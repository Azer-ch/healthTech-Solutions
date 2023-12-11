import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NursesService } from './nurses.service';
import { CreateNurseDto } from './dto/create-nurse.dto';

@Controller('nurses')
export class NursesController {
  constructor(private readonly nursesService: NursesService) {}

  @Get()
  async findAll() {
    return await this.nursesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.nursesService.findOne(id);
  }
  @Post()
  async create(@Body()createNurseDto: CreateNurseDto){
    return await this.nursesService.create(createNurseDto);
  }
}
