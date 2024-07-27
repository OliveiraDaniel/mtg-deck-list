import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from '@tanstack/react-router'
import ResultList from './ResultList'
import { useState } from 'react'

type SearchFormData = {
  searchQuery: string
}

const SearchForm = () => {
  const { register, handleSubmit } = useForm<SearchFormData>()
  const router = useRouter()
  const [results, setResults] = useState<{ id: number, name: string }[]>([])

  const onSubmit: SubmitHandler<SearchFormData> = data => {

    //Substituir pelo JSON da API
    const jsonObject = [
      { id: 1, name: 'Atraxa' },
      { id: 2, name: 'Breena a Demagoga' },
      { id: 3, name: 'Wyleth' },
      { id: 3, name: 'Saskia' }
    ]

    const result = jsonObject.filter(item =>
      item.name.toLowerCase().includes(data.searchQuery.toLowerCase())
    )

    setResults(result)

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
      <ResultList results={results} />
    </>
  )
}

export default SearchForm
