import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { Organization } from './entities/organization.entity';
import {
  CreateOrganizationInput,
  CreateOrganizationOwnerInput,
} from './dto/create-organization.input';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Mutation(() => Organization)
  createOrganization(
    @Args('organization')
    createOrganizationInput: CreateOrganizationInput,
    @Args('organizationOwner')
    organizationOwner: CreateOrganizationOwnerInput,
  ) {
    return this.organizationService.create(
      createOrganizationInput,
      organizationOwner,
    );
  }
}
