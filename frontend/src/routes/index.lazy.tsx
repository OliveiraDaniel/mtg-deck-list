import { createLazyFileRoute } from '@tanstack/react-router'
import SearchForm from '../components/Form'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h1>MTG - Card List</h1>
      <SearchForm />
    </div>
  )
}
