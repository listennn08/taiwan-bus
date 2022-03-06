import { getPokemons, getPokemonDetail } from '../pages/api/getPokemon'
import Image from 'next/image'

interface IPokemon {
  name: string
  img: string
}
export default function Pokemon() {
  const [isLoading, setIsLoading] = useState(false)
  const [pokemon, setPokemon] = useState<IPokemon[]>([])

  const getData = useMemo(() => async () => {
    setIsLoading(true)
    const allPokemons = (await getPokemons()).data.data.pokemons.results
    const pokemonDetail = (await Promise.all(allPokemons.map((_: string, i: number) => getPokemonDetail(i + 1)))).map((el) => el.data.data.pokemon)
    
    setPokemon(pokemonDetail)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])
  return (
    <>
    {isLoading
      ? <>Loading Pokemon...</>
      : <div className='flex'>
          {pokemon.map(({ name, img }) => (
            <div key={name} className='text-center'>
              <Image src={img} alt={name} width={100} height={100} />
              <h3>{name}</h3>
            </div>
          ))}
        </div>
    }
    </>
  )
}