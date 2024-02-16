import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'Ninja A', weapon: 'stars' },
    { id: 1, name: 'Ninja B', weapon: 'nunchucks' },
    { id: 2, name: 'Ninja C', weapon: 'katana' },
  ];

  getNinjas(weapon?: 'stars' | 'nunchucks' | 'katana') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) throw new Error('Ninja not found.');
    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: Date.now(),
    };

    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinja(id: number, UpdateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...UpdateNinjaDto };
      }

      return ninja;
    });

    return this.getNinja(id);
  }

  deleteNinja(id: number) {
    const toBeRemoved = this.getNinja(id);

    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return toBeRemoved;
  }
}
