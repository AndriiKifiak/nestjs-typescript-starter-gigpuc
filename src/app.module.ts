import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from "@nestjs/graphql";
import { UsersResolvers } from './user.resolvers';
@Module({
  imports: [
    GraphQLFederationModule.forRootAsync({
      // imports: definition.loader?.imports,
      // inject: definition.loader?.injects,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useFactory: (...args: any[]) => ({
        autoSchemaFile: true,
        include: [],
        buildSchemaOptions: {},
        // This will examine the request object and create a context object
        // that can be consumed by the DGM resolvers.
        context: ({ req }) => {
          const authHeader = req.headers.authorization;
          const authTokenType = req.headers.authtokentype;
          const authToken = authHeader.slice("Bearer ".length);
          const principalId = req.headers.principalid;
          return {
            authHeader,
            authToken,
            authTokenType,
            principalId,
          };
        }
      })
    })
  ],
  providers: [UsersResolvers],
})
export class AppModule {
  constructor() {}
}
