import { Role, User } from '@prisma/client'
import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { type Role as TRole } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { talentCoreApi } from '@/services/talent-core-api'

type AuthProviderProps = {
  children: React.ReactNode
}

export type AuthContextType = {
  user: User | null
  role: TRole
  isLoadingAuth: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getToken } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['users', 'who-am-i'],
    queryFn: async () =>
      talentCoreApi
        .get<User & { role: Role }>('/api/users/who-am-i', {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })
        .then((res) => res.data)
  })

  const user = useMemo(() => data || null, [data])

  const role = useMemo(() => {
    const role = user?.role.roleName
    return role ? (role as TRole) : 'Guest'
  }, [user])

  return <AuthContext.Provider value={{ user, role, isLoadingAuth: isLoading }}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
