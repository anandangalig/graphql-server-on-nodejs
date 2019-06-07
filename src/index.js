const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

// resolvers:
//GraphQL resolver functions always receive four arguments: root, args, context, info
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      // context: plain JavaScript object that every resolver in the resolver chain can read from and write to - it thus basically is a means for resolvers to communicate. Also, a way to pass arbitrary data or functions to the resolvers
      return context.prisma.links();
      // This Prisma client instance effectively lets you access your database through the Prisma API. It exposes a number of methods that let you perform CRUD operations for your models.
    },
    link: (root, { id }, context, info) => {
      return context.prisma.link({ id });
    },
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      });
      // Prisma client exposes a CRUD API for the models in your datamodel for you to read and write in your database. These methods are auto-generated based on model definitions in datamodel.prisma.
    },
    updateLink: (root, args, context) => {
      return context.prisma.updateLink({
        data: {
          url: args.url,
        },
        where: {
          id: args.id,
        },
      });
    },
    deleteLink: (root, args, context) => {
      return context.prisma.deleteLink({ id: args.id });
    },
  },
};

// create server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
