import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrganizationInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description?: string;
}

@InputType()
export class CreateOrganizationOwnerInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
