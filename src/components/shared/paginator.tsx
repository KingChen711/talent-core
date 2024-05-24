import ReactPaginate from 'react-paginate'
import { UseNavigateResult } from '@tanstack/react-router'
import { PagingMetaData } from '../../types/index'
import { buttonVariants } from '../../components/ui/button'
import { cn } from '../../lib/utils'

type Props = {
  navigate: UseNavigateResult<string>
  metadata: PagingMetaData
}

function Paginator({ navigate, metadata }: Props) {
  const paginate = ({ selected }: { selected: number }) => {
    window.scrollTo(0, 0)
    return navigate({
      search: (search) => ({
        ...search,
        pageNumber: selected + 1
      })
    })
  }

  return (
    <ReactPaginate
      forcePage={metadata.pageNumber - 1}
      onPageChange={paginate}
      pageCount={metadata.totalPages}
      breakClassName={buttonVariants({ variant: 'ghost' })}
      containerClassName={cn('flex justify-center gap-2 join')}
      pageLinkClassName={buttonVariants({ variant: 'outline' })}
      previousLinkClassName={buttonVariants({ variant: 'link' })}
      disabledClassName={'pointer-events-none opacity-50'}
      nextLinkClassName={buttonVariants({ variant: 'link' })}
      activeLinkClassName={buttonVariants()}
    />
  )
}

export default Paginator
