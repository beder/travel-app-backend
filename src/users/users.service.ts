import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma, Role } from '@prisma/client';
import { UserDTO } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async userForAuth(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserDTO | null> {
    const { password, ...where } = userWhereUniqueInput;

    if (!password?.toString().length) {
      return null;
    }

    const user = await this.prisma.user.findUnique({ where });

    return user?.password === password ? this.entityToDTO(user) : null;
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserDTO | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async roles(where: Prisma.RoleWhereInput): Promise<Role[]> {
    return this.prisma.role.findMany({
      where,
    });
  }

  async rolesByUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Role[] | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        roles: true,
      },
    });

    return user?.roles;
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserDTO[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    return users?.map(this.entityToDTO);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  private entityToDTO(entity: User): UserDTO {
    if (!entity) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...dto } = entity;

    return dto;
  }
}
