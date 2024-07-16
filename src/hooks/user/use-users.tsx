import { TGetUsersSchema } from '@/lib/validation/user.validation'
import { PagingMetaData, UserWithRole } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { talentCoreApi } from '@/services/talent-core-api'

export type UserStatus = ('Open' | 'Closed' | 'Upcoming')[]

type Users = UserWithRole[]

function useUsers(searchParams: TGetUsersSchema) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['users', searchParams],
    queryFn: async () =>
      talentCoreApi
        .get<Users>('/api/users', {
          params: searchParams,
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => ({
          metadata: JSON.parse(res.headers['x-pagination']) as PagingMetaData,
          items: res.data
        })),
    placeholderData: keepPreviousData
  })
}

export default useUsers
