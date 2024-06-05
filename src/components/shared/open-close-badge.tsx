import { Badge } from '../ui/badge'

type Props = {
  isOpening: boolean
}

function OpenCloseBadge({ isOpening }: Props) {
  return (
    <>
      {isOpening ? (
        <Badge className='text-sm font-extrabold' variant='success'>
          Opening
        </Badge>
      ) : (
        <Badge className='text-sm font-extrabold' variant='danger'>
          Closed
        </Badge>
      )}
    </>
  )
}

export default OpenCloseBadge
