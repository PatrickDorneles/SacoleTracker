import { Injectable } from '@nestjs/common';
import { Action } from '@prisma/client';
import { PrismaService } from 'src/global/prisma/prisma.service';
import {
  CreateOrganizationInput,
  CreateOrganizationOwnerInput,
} from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';

@Injectable()
export class OrganizationService {
  constructor(readonly prisma: PrismaService) {}

  async create(
    organizationInput: CreateOrganizationInput,
    organizationOwnerInput: CreateOrganizationOwnerInput,
  ) {
    const ownerPermissions = [
      {
        action: Action.authenticate,
      },
      {
        action: Action.create_product,
      },
      {
        action: Action.create_transaction,
      },
      {
        action: Action.manage_admins,
      },
      {
        action: Action.manage_users,
      },
      {
        action: Action.view_analytics,
      },
      {
        action: Action.view_storage,
      },
    ];

    const organization = await this.prisma.organization.create({
      data: {
        ...organizationInput,
        users: {
          create: {
            ...organizationOwnerInput,
            admin: true,

            permissions: {
              createMany: {
                data: ownerPermissions,
              },
            },
          },
        },
      },
    });

    return organization;
  }

  findAll() {
    return `This action returns all organization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationInput: UpdateOrganizationInput) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
