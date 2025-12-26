import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserStatus } from '../prisma/generated/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findByCompanyId(companyId: string): Promise<User[]> {
    return this.usersRepository.findByCompanyId(companyId);
  }

  async findByTeamId(teamId: string): Promise<User[]> {
    return this.usersRepository.findByTeamId(teamId);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    return this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      company: {
        connect: { id: createUserDto.companyId },
      },
      ...(createUserDto.teamId && {
        team: {
          connect: { id: createUserDto.teamId },
        },
      }),
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Check if user exists
    await this.findById(id);

    // Check if email is being changed and if it's already taken
    if (updateUserDto.email) {
      const existingUser = await this.usersRepository.findByEmail(
        updateUserDto.email,
      );
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(
          `User with email ${updateUserDto.email} already exists`,
        );
      }
    }

    const updateData: any = {
      ...(updateUserDto.name !== undefined && { name: updateUserDto.name }),
      ...(updateUserDto.email && { email: updateUserDto.email }),
      ...(updateUserDto.status && { status: updateUserDto.status }),
    };

    if (updateUserDto.companyId) {
      updateData.company = { connect: { id: updateUserDto.companyId } };
    }

    if (updateUserDto.teamId !== undefined) {
      updateData.team = updateUserDto.teamId
        ? { connect: { id: updateUserDto.teamId } }
        : { disconnect: true };
    }

    return this.usersRepository.update(id, updateData);
  }

  async delete(id: string): Promise<User> {
    // Check if user exists
    await this.findById(id);
    return this.usersRepository.delete(id);
  }

  async updateStatus(id: string, status: UserStatus): Promise<User> {
    // Check if user exists
    await this.findById(id);
    return this.usersRepository.updateStatus(id, status);
  }
}
