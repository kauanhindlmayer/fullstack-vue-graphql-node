const { ApolloServer } = require("apollo-server");
const dns = require("dns");

const typeDefs = `
  type Item {
    id: Int
    type: String
    description: String
  }

  type Domain {
    name: String
    extension: String
    checkout: String
    available: Boolean
  }

  type Query {
    items (type: String): [Item]
  }

  input ItemInput {
    type: String
    description: String
  }

  type Mutation {
    saveItem (item: ItemInput): Item
    deleteItem(id: Int): Boolean
    generateDomains: [Domain]
    generateDomain(name: String): [Domain]
  }
`;

const items = [
  { id: 1, type: "prefixe", description: "Air" },
  { id: 2, type: "prefixe", description: "Jet" },
  { id: 3, type: "prefixe", description: "Flight" },
  { id: 4, type: "sufixe", description: "Hub" },
  { id: 5, type: "sufixe", description: "Station" },
  { id: 6, type: "sufixe", description: "Mart" },
];

const isDomainAvailable = (domain) => {
  return new Promise((resolve, reject) => {
    dns.resolve(domain, (error) => {
      if (error) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

const resolvers = {
  Query: {
    items(_, args) {
      return items.filter((item) => item.type === args.type);
    },
  },
  Mutation: {
    saveItem(_, args) {
      const item = args.item;
      item.id = Math.floor(Math.random() * 1000);
      items.push(item);
      return item;
    },
    deleteItem(_, args) {
      const id = args.id;
      const item = items.find((item) => item.id === id);
      if (!item) return false;
      items.splice(items.indexOf(item), 1);
      return true;
    },
    async generateDomains() {
      const domains = [];
      const prefixes = items.filter((item) => item.type === "prefixe");
      const sufixes = items.filter((item) => item.type === "sufixe");

      for (const prefix of prefixes) {
        for (const suffix of sufixes) {
          const name = prefix.description + suffix.description;
          const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
          const available = await isDomainAvailable(`${url}.com.br`);
          domains.push({ name, checkout, available });
        }
      }
      return domains;
    },
    async generateDomain(_, args) {
      const name = args.name;
      const domains = [];
      const extensions = [".com.br", ".com", ".net", ".org"];
      for (const extension of extensions) {
        const url = name.toLowerCase();
        const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=${extension}}`;
        const available = await isDomainAvailable(`${url}${extension}`);
        domains.push({ name, extension, checkout, available });
      }
      return domains;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
