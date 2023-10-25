import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private petService: PetsService) {}

  @Query(() => [Pet])
  pets(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  @Query(() => Pet)
  async getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    const pet = await this.petService.findOne(id);
    if (!pet) {
      throw new NotFoundException('pet not found');
    }

    return pet;
  }

  @Mutation(() => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petService.createPet(createPetInput);
  }
}
