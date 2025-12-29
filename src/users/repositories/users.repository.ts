import { Prisma, User, UserStatus } from 'src/prisma/generated/client';
import { UserResponseDto } from '../dto';

export abstract class IUsersRepository {
  abstract findAll(): Promise<UserResponseDto[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByCompanyId(companyId: string): Promise<User[]>;
  abstract findByTeamId(teamId: string): Promise<User[]>;
  abstract create(data: Prisma.UserCreateInput): Promise<User>;
  abstract update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  abstract delete(id: string): Promise<User>;
  abstract updateStatus(id: string, status: UserStatus): Promise<User>;
}
