import { Input } from '../ui/input'
import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  search: string
  placeholder: string
}

function SearchForm({ search, placeholder }: Props) {
  const [searchTerm, setSearchTerm] = useState(search)
  const navigate = useNavigate()

  useEffect(() => {
    // sync "search" on url to "search" state, don't do the opposite
    setSearchTerm(search)
  }, [search])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    return navigate({
      search: (search) => ({
        ...search,
        search: searchTerm,
        pageNumber: 1,
        sort: '-createdAt'
      })
    })
  }

  return (
    <form onSubmit={handleSearch} className='flex max-w-md flex-1 items-center rounded-lg border-2 px-2'>
      <Search className='size-6' />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='rounded-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
        placeholder={placeholder}
      />
    </form>
  )
}

export default SearchForm
