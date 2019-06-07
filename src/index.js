const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

let findLinkIndex = id => {
  return links.findIndex(link => {
    return link.id === id;
  });
};
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
    link: (parent, args) => {
      const linksMatched = links.filter(link => {
        return link.id === args.id;
      });
      return linksMatched[0];
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
    updateLink: (parent, args) => {
      const targetLinkIndex = findLinkIndex(args.id);
      if (targetLinkIndex !== -1) {
        links[targetLinkIndex] = { ...links[targetLinkIndex], ...args };
      }
      return links[targetLinkIndex];
    },
    deleteLink: (parent, args) => {
      console.log('DELETE BEFORE: ', links);
      const targetLinkIndex = findLinkIndex(args.id);
      links.splice(targetLinkIndex, 1);
      console.log('DELETED: ', links);
    },
  },
  //because the implementation of the Link resolvers is trivial, you can actually omit them and the server will work in the same way as it did before 👌
  // Link: {
  //   id: parent => parent.id,
  //   description: parent => parent.description,
  //   url: parent => parent.url,
  // },
};

// create server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
