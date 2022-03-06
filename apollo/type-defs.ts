import gql from 'graphql-tag'

export const typeDefs = gql`
  type Pokemons {
    count: Int!
    next: String!
    previous: String
    results: [PokemonsItem]
  }

  type PokemonsItem {
    name: String!
    url: String!
  }
  type Pokemon {
    name: String!
    img: String!
  }
  type Query {
    pokemons: Pokemons
    pokemon(id: Int!): Pokemon
  }
`