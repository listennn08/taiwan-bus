import axios from 'axios'
import { print } from 'graphql'
import gql from 'graphql-tag'

export const getPokemons = () => axios.post('/graphql', {
  query: print(gql`
    query Results {
      pokemons {
        results {
          name
          url
        }
      }
    }
  `),
})

export const getPokemonDetail = (id: number) =>  axios.post('/graphql', {
  query: print(gql`
    query Pokemon($id: Int!) {
      pokemon(id: $id) {
        name
        img
      }
    }
  `),
  variables: { id }
})