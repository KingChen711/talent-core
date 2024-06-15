import { Role as TRole, User } from '@prisma/client'

export type Role = 'Guest' | 'Candidate' | 'Employee'

export type PagingMetaData = {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}

export type BaseErrorResponse = {
  statusCode: number
  message: string
}

export type UserWithRole = User & { role: TRole }
