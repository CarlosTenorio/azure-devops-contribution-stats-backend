import { Prisma, User, UserStatus } from '@prisma/client';
import { GetResponseUserDto, GetResponseUsersDto } from '../dto';

export abstract class IUsersRepository {
  abstract findAll(): Promise<GetResponseUsersDto[]>;
  abstract findById(id: string): Promise<GetResponseUserDto | null>;
  abstract findByEmail(email: string): Promise<GetResponseUserDto | null>;
  abstract findByTeamId(teamId: string): Promise<GetResponseUsersDto[]>;
  abstract create(data: Prisma.UserCreateInput): Promise<User>;
  abstract update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  abstract delete(id: string): Promise<User>;
  abstract updateStatus(id: string, status: UserStatus): Promise<User>;
}
