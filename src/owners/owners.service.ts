import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';
import { PetsService } from 'src/pets/pets.service';
import { Pet } from 'src/pets/pet.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
    @Inject(forwardRef(() => PetsService))
    private petsService: PetsService,
  ) {}
  create(createOwnerInput: CreateOwnerInput) {
    const owner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(owner);
  }

  findAll() {
    return this.ownersRepository.find();
  }

  findOne(id: number) {
    return this.ownersRepository.findOneBy({ id });
  }

  getPets(ownerId: number): Promise<Pet[]> {
    return this.petsService.findAll({ ownerId });
  }
}
