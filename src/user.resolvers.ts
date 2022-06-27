import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from './user';

@Resolver((of) => User)
export class UsersResolvers {
  constructor() {}

  @Query((returns) => User)
  getUser(@Args('id') id: number): User {
    throw new Error("Need to implement");
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): User {
    throw new Error("Need to implement");
  }
}