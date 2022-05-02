import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';

describe('OrganizationResolver', () => {
  let resolver: OrganizationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationResolver, OrganizationService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    resolver = module.get<OrganizationResolver>(OrganizationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
