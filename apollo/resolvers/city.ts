// import { cityGet } from '../services/core/cityCore'
import { city } from '../data/city'

export const cityQueries = {
  Query: {
    async cities(_parent: undefined, _args: any, ctx: any){
      // const resp  = (await cityGet()).data
      // return resp
      return city
    }
  }
}