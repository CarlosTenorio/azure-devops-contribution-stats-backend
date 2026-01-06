import { Prisma, User, UserStatus } from '@prisma/client';
import { GetResponseUserDto } from '../dto';

export abstract class IUsersRepository {
  abstract findAll(): Promise<GetResponseUserDto[]>;
  abstract findById(id: string): Promise<GetResponseUserDto | null>;
  abstract findByEmail(email: string): Promise<GetResponseUserDto | null>;
  abstract create(data: Prisma.UserCreateInput): Promise<User>;
  abstract update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  abstract delete(id: string): Promise<User>;
  abstract updateStatus(id: string, status: UserStatus): Promise<User>;
}
