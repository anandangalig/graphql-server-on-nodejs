async function feed(parent, args, context, info) {
  const where = args.filter
    ? { OR: [{ description_contains: args.filter }, { url_contains: args.filter }] }
    : {};

  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
  });

  return links;
}
function link(root, { id }, context, info) {
  return context.prisma.link({ id });
}
module.exports = {
  feed,
  link,
};

// NOTES:

//GraphQL resolver functions always receive four arguments: root, args, context, info

// context: plain JavaScript object that every resolver in the resolver chain can read from and write to - it thus basically is a means for resolvers to communicate. Also, a way to pass arbitrary data or functions to the resolvers

// Prisma client effectively lets you access your database through the Prisma API. It exposes a number of auto generated methods that let you perform CRUD operations on your data modeled in datamodel.prisma
