function postedBy(parent, args, context) {
  return context.prisma.link({ id: parent.id }).postedBy();
  // WHAT IS HAPPENING HERE?
  // .postedBy() call cannot be a recursion, right?
}
function votes(parent, args, context) {
  return context.prisma.link({ id: parent.id }).votes();
}
module.exports = {
  postedBy,
  votes,
};
