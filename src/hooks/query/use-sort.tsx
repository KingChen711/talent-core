import { useNavigate } from '@tanstack/react-router'
import { ChevronsDown, ChevronsUp, ChevronsUpDown } from 'lucide-react'
import { useCallback } from 'react'

type Props = {
  key: string
  sortParams: string | undefined
}

function useSort({ key, sortParams }: Props) {
  const navigate = useNavigate()

  const sorter = () => {
    if (sortParams === key) {
      return navigate({
        search: (search) => ({
          ...search,
          sort: `-${key}`,
          pageNumber: 1
        })
      })
    }

    return navigate({
      search: (search) => ({
        ...search,
        sort: key,
        pageNumber: 1
      })
    })
  }

  const Icon = useCallback(() => {
    return sortParams === key ? (
      <ChevronsUp className='ml-1 size-4' />
    ) : sortParams === `-${key}` ? (
      <ChevronsDown className='ml-1 size-4' />
    ) : (
      <ChevronsUpDown className='ml-1 size-4' />
    )
  }, [sortParams])

  return { Icon, sorter }
}

export default useSort
