import { ObjectType, Field } from '@nestjs/graphql';
import { Organization as PrismaOrganization } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Organization implements PrismaOrganization {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [User])
  users: User[];
}
