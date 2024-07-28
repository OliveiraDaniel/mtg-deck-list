import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from '@tanstack/react-router'
import ResultList from './ResultList'
import { useState } from 'react'
import { fetchCards } from '../utils/api'
import { CardDetailProps } from '../types/cardPropsReturn'

type SearchFormData = {
  searchQuery: string
}

const SearchForm = () => {
  const { register, handleSubmit } = useForm<SearchFormData>()
  const router = useRouter()
  const [results, setResults] = useState<CardDetailProps[]>([])
  const [error, setError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<SearchFormData> = async (data) => {
    try {
      const cards: CardDetailProps[] = await fetchCards(data.searchQuery)
      const result: CardDetailProps[] = cards.map((item) => {
        return {
          id: item.id,
          name: item.name,
          image: item.image || '',
          released_at: item.released_at,
          printed_text: item.printed_text,
          mana_cost: item.mana_cost,
          power: item.power,
          toughness: item.toughness,
        }
      })
      setResults(result)
      setError(null)
    } catch (error) {
      setResults([])
      setError('Não encontramos nenhum card com esse nome')
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
          placeholder="Busque pelo nome da carta"
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
