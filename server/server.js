const { ApolloServer } = require("apollo-server");

const typeDefs = `
  type Item {
    id: Int
    type: String
    description: String
  }

  type Query {
    items (type: String): [Item]
  }
`;

const items = [
  { id: 1, type: "Prefixe", description: "Air" },
  { id: 2, type: "Prefixe", description: "Jet" },
  { id: 3, type: "Prefixe", description: "Flight" },
  { id: 4, type: "Sufixe", description: "Hub" },
  { id: 5, type: "Sufixe", description: "Station" },
  { id: 6, type: "Sufixe", description: "Mart" },
];

const resolvers = {
  Query: {
    items(_, args) {
      return items.filter((item) => item.type === args.type);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
