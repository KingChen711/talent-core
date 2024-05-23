import { whoAmI } from '@/apis/users.api'
import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'

function useWhoAmI() {
  const { getToken, userId: clerkId } = useAuth()

  return useQuery({
    queryKey: ['users', 'who-am-i', { clerkId }],
    queryFn: () => whoAmI(getToken)
  })
}

export default useWhoAmI
