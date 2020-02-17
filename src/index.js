const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  info: String!
  flavourtext: String!
  uselessInfo: String!
  feed: [Link!]!
}

type Mutation {
  post(url: String!, description: String!): Link!
}

type Link {
  id: ID!
  description: String!
  url: String!
  image: String!
}
`

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
  image: 'this is an image'
}]

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernew Clone`,
    flavourtext: () => `This is some flavourtext for the demo`,
    uselessInfo: () => `This is useless information`,
    feed: () => links
  },

  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
    image: (parent) => parent.image
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
