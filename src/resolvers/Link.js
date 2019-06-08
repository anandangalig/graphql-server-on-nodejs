function postedBy(parent, args, context) {
  return context.prisma.link({ id: parent.id }).postedBy();
  // WHAT IS HAPPENING HERE?
  // .postedBy() call cannot be a recursion, right?
}

module.exports = {
  postedBy,
};
