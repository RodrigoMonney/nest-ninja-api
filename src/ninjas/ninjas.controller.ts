import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { create } from 'domain';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks' | 'katana') {
    try {
      return this.ninjasService.getNinjas(weapon);
    } catch (err) {
      throw new HttpException(
        'Failed to get ninjas.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (err) {
      throw new NotFoundException(`Ninja with ID '${id}' not found.`);
    }
  }

  @UseGuards(BeltGuard)
  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    try {
      return this.ninjasService.createNinja(createNinjaDto);
    } catch (err) {
      throw new BadRequestException('Failed to create ninja.');
    }
  }

  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() UpdateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, UpdateNinjaDto);
  }

  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjasService.deleteNinja(+id);
  }
}
