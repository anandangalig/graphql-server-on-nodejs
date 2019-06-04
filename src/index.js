const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];
let idCount = links.length;
let findLinkIndex = id => {
  return links.findIndex(link => {
    return link.id === id;
  });
};
// resolvers:
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      const linksMatched = links.filter(link => {
        return link.id === args.id;
      });
      return linksMatched[0];
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      console.log('POST: ', links);

      return link;
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
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
