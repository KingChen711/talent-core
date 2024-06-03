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
