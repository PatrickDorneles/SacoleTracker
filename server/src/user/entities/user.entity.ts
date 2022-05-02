import { ObjectType, Field } from '@nestjs/graphql';
import { User as PrismaUser } from '@prisma/client';

@ObjectType()
export class User implements PrismaUser {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  avatarUrl: string | null;

  @Field(() => String)
  organizationId: string;

  @Field(() => Boolean)
  admin: boolean;

  // Password does not goes into GQL
  password: string;
}
