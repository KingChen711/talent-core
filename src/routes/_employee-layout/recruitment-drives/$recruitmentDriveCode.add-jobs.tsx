import DialogContentOpenJob from '@/components/jobs/dialog-content-open-job'
import Paginator from '@/components/shared/paginator'
import SearchForm from '@/components/shared/search-form'
import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useSort from '@/hooks/query/use-sort'
import useRecruitmentDriveAddableJobs from '@/hooks/recruitment-drive/use-recruitment-drive-addable-jobs'
import { isBaseError, toDate } from '@/lib/utils'
import { jobSearchSchema } from '@/lib/validation/job.validation'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { StatusCodes } from 'http-status-codes'
export const Route = createFileRoute('/_employee-layout/recruitment-drives/$recruitmentDriveCode/add-jobs')({
  component: RecruitmentDriveAddJobsPage,
  validateSearch: (search) => {
    const result = jobSearchSchema.parse(search)
    result.status = 'closed' // in this page the status is always "closed"
    return result
  }
})

function RecruitmentDriveAddJobsPage() {
  const router = useRouter()
  const { recruitmentDriveCode } = Route.useParams()
  const { pageNumber, pageSize, search, sort, status } = Route.useSearch()

  const { Icon: CodeSortIcon, sorter: handleSortByCode } = useSort({ key: 'code', sortParams: sort })
  const { Icon: NameSortIcon, sorter: handleSortByName } = useSort({ key: 'name', sortParams: sort })
  const { Icon: CreatedAtSortIcon, sorter: handleSortByCreatedAt } = useSort({ key: 'createdAt', sortParams: sort })

  const { data, isLoading } = useRecruitmentDriveAddableJobs(
    recruitmentDriveCode,
    {
      pageNumber,
      pageSize,
      search,
      sort,
      status
    },

    (error: unknown) => {
      if (!isBaseError(error) || error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
        toast({
          title: `Cannot get addable jobs`,
          description: 'Some thing went wrong.',
          variant: 'danger'
        })

        return
      }

      toast({
        title: `Cannot get addable jobs`,
        description: error.response?.data.message,
        variant: 'danger'
      })
    }
  )

  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-x-5'>
        <h3 className='mb-4 text-2xl font-semibold'>Add jobs to {recruitmentDriveCode}</h3>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-x-4'>
        <SearchForm search={search} placeholder='Search jobs...' />
        <div className='flex items-center justify-end gap-x-4'>
          <Button variant='secondary' onClick={() => router.history.back()}>
            Cancel
          </Button>
        </div>
      </div>

      <div className='my-5 rounded-2xl bg-card p-4'>
        <div className='grid w-full'>
          <div className='overflow-x-auto'>
            <Table className='overflow-hidden'>
              <TableHeader className='rounded-lg bg-border'>
                <TableRow className='rounded-lg'>
                  <TableHead onClick={handleSortByCode} className='h-10 cursor-pointer rounded-l-lg'>
                    <div className='flex items-center'>
                      <p className='select-none'>Code</p>
                      <CodeSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByName} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none text-nowrap'>Job Name</p>
                      <NameSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByCreatedAt} className='h-10 w-fit cursor-pointer'>
                    <div className='flex items-center justify-center'>
                      <p className='select-none'>Created At</p>
                      <CreatedAtSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByCreatedAt} className='h-10 w-fit cursor-pointer'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <TableRowsSkeleton colSpan={5} pageSize={pageSize} />}

                {data?.items.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className='font-extrabold'>{job.code}</TableCell>
                    <TableCell className='flex items-center gap-x-3 font-semibold'>
                      <img alt='job' src={job.icon} className='size-8 rounded-md object-cover' />
                      <p>{job.name}</p>
                    </TableCell>
                    <TableCell className='text-center'>{toDate(job.createdAt)}</TableCell>
                    <TableCell className='text-end'>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Open this job</Button>
                        </DialogTrigger>
                        <DialogContentOpenJob jobCode={job.code} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {!isLoading && data?.items.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Jobs.</div>
        )}
      </div>

      {data && data.items.length > 0 && <Paginator metadata={data.metadata} />}
    </section>
  )
}

export default RecruitmentDriveAddJobsPage
