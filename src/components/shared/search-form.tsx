import { Input } from '../ui/input'
import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebounce } from '@reactuses/core'

type Props = {
  search: string
  placeholder: string
}

function SearchForm({ search, placeholder }: Props) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState(search)
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  useEffect(() => {
    // sync "search" on url to "search" state, don't do the opposite
    setSearchTerm(search)
  }, [search])

  useEffect(() => {
    const handleSearch = () => {
      return navigate({
        search: (search) => ({
          ...search,
          search: searchTerm,
          pageNumber: 1,
          sort: '-createdAt'
        })
      })
    }

    handleSearch()
  }, [debouncedSearchTerm])

  return (
    <div className='flex max-w-md flex-1 items-center rounded-lg border-2 px-2'>
      <Search className='size-6' />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='rounded-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
        placeholder={placeholder}
      />
    </div>
  )
}

export default SearchForm
