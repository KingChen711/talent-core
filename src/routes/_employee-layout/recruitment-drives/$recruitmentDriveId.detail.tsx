import useRecruitmentDriveDetail, { JobDetails } from '@/hooks/recruitment-drive/use-recruitment-drive-detail'
import { cn, toDate } from '@/lib/utils'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import JobDetailCard from '@/components/jobs/job-detail-card'
import NoResult from '@/components/shared/no-result'
import OpenCloseBadge from '@/components/shared/open-close-badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { applicationTabs } from '@/constants'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getApplicationsByRecruitmentDriveSchema } from '@/lib/validation/application.validation'
import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'

export const Route = createFileRoute('/_employee-layout/recruitment-drives/$recruitmentDriveId/detail')({
  component: RecruitmentDriveDetailPage,
  validateSearch: (search) => getApplicationsByRecruitmentDriveSchema.parse(search)
})

function RecruitmentDriveDetailPage() {
  const { recruitmentDriveId } = Route.useParams()

  const { pageNumber, pageSize, sort, status, search } = Route.useSearch()

  const { data: recruitmentDrive, isLoading: isLoadingRecruitmentDrive } = useRecruitmentDriveDetail(recruitmentDriveId)

  if (isLoadingRecruitmentDrive) return <div>Skeleton</div>

  if (!recruitmentDrive) {
    return (
      <NoResult
        title='No recruitment drive found.'
        description=''
        link='/recruitment-drives'
        linkTitle='Back to list'
      />
    )
  }

  return (
    <section>
      <div className='mb-5 space-y-1'>
        <div className='flex items-center gap-x-2'>
          <h2 className='text-2xl font-semibold'>{recruitmentDrive.name}</h2>
          <OpenCloseBadge isOpening={recruitmentDrive.isOpening} />
        </div>
        <p className='text-xl text-muted'>
          {recruitmentDrive.code}, {toDate(recruitmentDrive.startDate)} - {toDate(recruitmentDrive.endDate)}
        </p>
      </div>

      <div className='mb-2 flex items-center justify-between'>
        <div className='text-xl font-semibold'>Jobs</div>
        <Button size='sm' asChild>
          <Link to={`/recruitment-drives/${recruitmentDrive.code}/add-jobs`}>
            <Plus className='mr-1 size-5' />
            Add Job
          </Link>
        </Button>
      </div>

      {recruitmentDrive.jobDetails.length === 0 && (
        <div className='flex h-44 items-center justify-center rounded-md border text-xl font-medium'>
          No any jobs found
        </div>
      )}

      <div className='grid w-full'>
        <div className='overflow-x-auto'>
          <div className='flex gap-x-6 pb-2'>
            {recruitmentDrive.jobDetails.map((jd) => (
              <JobDetailCard
                key={jd.job.id}
                name={jd.job.name}
                color={jd.job.color}
                icon={jd.job.icon}
                quantity={jd.quantity}
                createdAt={jd.createdAt}
                countApplications={jd.countApplications}
                countApplicationsApproved={jd.countApplicationsApproved}
                countApplicationsLastWeek={jd.countApplicationsLastWeek}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='mb-2 mt-8 flex items-center justify-between'>
        <div className='text-xl font-semibold'>Candidates</div>
        <DialogSelectJobForAddCandidate
          recruitmentDriveCode={recruitmentDrive.code}
          jobDetails={recruitmentDrive.jobDetails}
        />
      </div>

      <div className='my-5 rounded-2xl bg-card p-4'>
        <div className='mb-4 flex flex-wrap gap-x-8 gap-y-3 border-b'>
          {applicationTabs.map((tab) => {
            console.log(status)

            const active = status === tab.status

            return (
              <Link
                search={(prev) => ({ ...prev, status: tab.status, pageNumber: 1, sort: '-createdAt' })}
                key={tab.status}
                className={cn(
                  'relative w-[90px] pb-4 text-center text-muted',
                  active && 'text-gradient-foreground font-bold'
                )}
              >
                {tab.label}
                {active && <div className='bg-gradient absolute bottom-0 left-0 h-[3px] w-full'></div>}
              </Link>
            )
          })}
        </div>

        <div className='grid w-full'>
          <div className='overflow-x-auto'>
            <Table className='overflow-hidden'>
              <TableHeader className='rounded-lg bg-border'>
                <TableRow className='rounded-lg'>
                  <TableHead className='h-10 cursor-pointer rounded-l-lg'>
                    <div className='flex items-center'>
                      <p className='select-none'>Candidate Name</p>
                      {/* <CodeSortIcon /> */}
                    </div>
                  </TableHead>
                  <TableHead className='h-10 cursor-pointer rounded-l-lg'>
                    <div className='flex items-center'>
                      <p className='select-none'>Applied Job</p>
                    </div>
                  </TableHead>
                  <TableHead className='h-10 cursor-pointer rounded-l-lg'>
                    <div className='flex items-center'>
                      <p className='select-none'>Applied Date</p>
                    </div>
                  </TableHead>

                  <TableHead className='h-10 select-none text-center'>Status</TableHead>
                  <TableHead className='h-10 select-none text-nowrap rounded-r-lg text-end'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {isPending && <TableRowsSkeleton colSpan={5} pageSize={pageSize} />} */}

                {/* {data.jobDetails
                  .flatMap((jd) => jd.applications)
                  .map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className='font-extrabold'>{application.candidate.id}</TableCell>
                    </TableRow>
                  ))} */}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* {!isPending && data?.items.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Recruitment Drives.</div>
        )} */}
      </div>

      {/* {data && data.items.length > 0 && <Paginator metadata={data.metadata} />} */}
    </section>
  )
}

export default RecruitmentDriveDetailPage

type DialogSelectJobForAddCandidateProps = {
  recruitmentDriveCode: string
  jobDetails: JobDetails
}

function DialogSelectJobForAddCandidate({ jobDetails, recruitmentDriveCode }: DialogSelectJobForAddCandidateProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>
          <Plus className='mr-1 size-5' />
          Add Candidate
        </Button>
      </DialogTrigger>
      <DialogContent className='w-fit'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-center'>Select A Job Position</DialogTitle>
          <DialogDescription asChild>
            <ScrollArea className='max-h-[60dvh] px-[10px]'>
              <div className='space-y-4'>
                {jobDetails.map((jd) => (
                  <Link
                    to={`/recruitment-drives/${recruitmentDriveCode}/jobs/${jd.job.code}/add-candidate`}
                    key={jd.job.id}
                    className='block hover:opacity-70'
                  >
                    <JobDetailCard
                      name={jd.job.name}
                      color={jd.job.color}
                      icon={jd.job.icon}
                      quantity={jd.quantity}
                      createdAt={jd.createdAt}
                      countApplications={jd.countApplications}
                      countApplicationsApproved={jd.countApplicationsApproved}
                      countApplicationsLastWeek={jd.countApplicationsLastWeek}
                      showNavigate={false}
                    />
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
