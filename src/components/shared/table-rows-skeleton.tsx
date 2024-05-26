import { TableCell, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'

type Props = {
  pageSize: number
  colSpan: number
}

function TableRowsSkeleton({ colSpan, pageSize }: Props) {
  return (
    <>
      {Array(pageSize)
        .fill(0)
        .map((_, i) => (
          <TableRow key={i}>
            <TableCell colSpan={colSpan} className='p-0'>
              <Skeleton className='my-2 h-14 w-full' />
            </TableCell>
          </TableRow>
        ))}
    </>
  )
}

export default TableRowsSkeleton
