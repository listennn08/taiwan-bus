import axios from 'axios'
export const resolvers = {
  Query: {
    async pokemons() {
      const resp = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=6&offset=0')
      return resp.data
    },

    async pokemon(_parent: undefined, _arg: { id: string }) {
      const resp = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${_arg.id}`)).data as {
        name: string,
        sprites: { front_default: string }
      }
      return {
        name: resp.name,
        img: resp.sprites.front_default,
      }
    }
  }
}