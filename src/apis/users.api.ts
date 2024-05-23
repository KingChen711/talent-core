import { talentCoreApi } from '@/services/talent-core-api'
import { Role, User } from '@prisma/client'
import { type GetToken } from '@clerk/types/dist'

export const whoAmI = async (getToken: GetToken) =>
  talentCoreApi
    .get<User & { role: Role }>('/api/users/who-am-i', {
      headers: {
        Authorization: `Bearer ${await getToken()}`
      }
    })
    .then((res) => res.data)
