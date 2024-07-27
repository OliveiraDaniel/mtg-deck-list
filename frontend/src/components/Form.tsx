import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from '@tanstack/react-router'
import ResultList from './ResultList'
import { useState } from 'react'
import { fetchCards } from '../utils/api'

type CardResult = {
  id: number
  name: string
  cardmarket_id: number
  image: string
}

type SearchFormData = {
  searchQuery: string
}

const SearchForm = () => {
  const { register, handleSubmit } = useForm<SearchFormData>()
  const router = useRouter()
  const [results, setResults] = useState<CardResult[]>([])
  const [error, setError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<SearchFormData> = async (data) => {
    try {
      // Buscar cards da API
      const cards: CardResult[] = await fetchCards(data.searchQuery)

      const result: CardResult[] = cards.map((item, index) => {
        console.log('Processing item:', item) // Adiciona um log para depuração
        return {
          id: index,
          name: item.name,
          cardmarket_id: item.cardmarket_id,
          image: item.image || '', // Define um valor padrão caso image_uris.normal não esteja presente
        }
      })

      console.log('resultresultresult', result)
      setResults(result)
      setError(null)
    } catch (error) {
      setResults([])
      setError('Erro ao buscar dados da API. Tente novamente mais tarde.')
    }

    router.navigate({
      to: '/',
      search: { name: data.searchQuery },
      replace: true,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Busque pelo commander"
          {...register('searchQuery', { required: true })}
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p>{error}</p>}
      <ResultList results={results} />
    </>
  )
}

export default SearchForm
