import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserStatus } from '@prisma/client';
import {
  GetResponseUserDto,
  GetResponseUsersDto,
  PostResponseUsersDto,
} from './dto';
import { PostBodyUsersDto } from './dto/post/post-body-users.dto';
import { PutBodyUsersDto } from './dto/put/put-body-users.dto';
import { IUsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async findAll(): Promise<GetResponseUsersDto[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: string): Promise<GetResponseUserDto> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<GetResponseUserDto> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findByTeamId(teamId: string): Promise<GetResponseUsersDto[]> {
    return this.usersRepository.findByTeamId(teamId);
  }

  async create(createUserDto: PostBodyUsersDto): Promise<PostResponseUsersDto> {
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
      oauthId: createUserDto.oauthId,
      connection: createUserDto.connection,
      ...(createUserDto.companyOwnerUserId && {
        companyOwner: { connect: { id: createUserDto.companyOwnerUserId } },
      }),
      ...(createUserDto.teamId && {
        team: { connect: { id: createUserDto.teamId } },
      }),
    });
  }

  async update(id: string, updateUserDto: PutBodyUsersDto): Promise<User> {
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
    await this.findById(id);
    return this.usersRepository.delete(id);
  }

  async updateStatus(id: string, status: UserStatus): Promise<User> {
    await this.findById(id);
    return this.usersRepository.updateStatus(id, status);
  }
}
