const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];
let idCount = links.length;

// resolvers:
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
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
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
