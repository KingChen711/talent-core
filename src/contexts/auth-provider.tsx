import { User } from '@prisma/client'
import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { type Role } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { whoAmI } from '@/apis/users.api'

type AuthProviderProps = {
  children: React.ReactNode
}

export type AuthContextType = {
  user: User | null
  role: Role
  isLoadingAuth: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getToken, userId: clerkId } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['users', 'who-am-i', { clerkId }],
    queryFn: () => whoAmI(getToken)
  })

  const user = useMemo(() => data || null, [data])

  const role = useMemo(() => {
    const role = user?.role.roleName
    return role ? (role as Role) : 'Guest'
  }, [user])

  useEffect(() => {
    console.log({ role })
  }, [role])

  useEffect(() => {
    console.log({ user })
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
