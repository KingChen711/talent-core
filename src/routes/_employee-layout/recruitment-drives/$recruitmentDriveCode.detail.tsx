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
import { applicantTabs } from '@/constants'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getApplicantsSchema } from '@/lib/validation/applicant.validation'
import TableRowsSkeleton from '@/components/shared/table-rows-skeleton'
import useSort from '@/hooks/query/use-sort'
import SearchForm from '@/components/shared/search-form'
import useRecruitmentDriveApplicants from '@/hooks/recruitment-drive/use-recruitment-drive-applicants'
import ApplicantBadge from '@/components/shared/applicant-badge'
import Paginator from '@/components/shared/paginator'
import DropdownSettingApplicant from '@/components/applicant/dropdown-setting-applicant'

export const Route = createFileRoute('/_employee-layout/recruitment-drives/$recruitmentDriveCode/detail')({
  component: RecruitmentDriveDetailPage,
  validateSearch: (search) => getApplicantsSchema.parse(search)
})

function RecruitmentDriveDetailPage() {
  const { recruitmentDriveCode } = Route.useParams()

  const { pageNumber, pageSize, sort, status, search } = Route.useSearch()

  const { data: recruitmentDrive, isLoading: isLoadingRecruitmentDrive } =
    useRecruitmentDriveDetail(recruitmentDriveCode)

  const { data, isPending: isLoadingApplicants } = useRecruitmentDriveApplicants(recruitmentDriveCode, {
    pageNumber,
    pageSize,
    search,
    sort,
    status
  })

  const { Icon: CandidateNameSortIcon, sorter: handleSortByCandidateName } = useSort({
    key: 'candidateName',
    sortParams: sort
  })
  const { Icon: AppliedJobSortIcon, sorter: handleSortByAppliedJob } = useSort({ key: 'appliedJob', sortParams: sort })
  const { Icon: CreatedAtSortIcon, sorter: handleSortByCreatedAt } = useSort({
    key: 'createdAt',
    sortParams: sort
  })

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
                countApplicants={jd.countApplicants}
                countApplicantsApproved={jd.countApplicantsApproved}
                countApplicantsLastWeek={jd.countApplicantsLastWeek}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='mb-2 mt-8 flex items-center justify-between gap-x-4'>
        <div className='text-xl font-semibold'>Candidates</div>
        <SearchForm search={search} placeholder='Search candidate...' />
        <DialogSelectJobForAddCandidate
          recruitmentDriveCode={recruitmentDrive.code}
          jobDetails={recruitmentDrive.jobDetails}
        />
      </div>

      <div className='my-5 rounded-2xl bg-card p-4'>
        <div className='mb-4 flex flex-wrap gap-x-8 gap-y-3 border-b'>
          {applicantTabs.map((tab) => {
            console.log(status)

            const active = status === tab.status

            return (
              <Link
                search={(prev) => ({ ...prev, status: tab.status, pageNumber: 1, sort: '-createdAt' })}
                key={tab.status}
                className={cn(
                  'relative w-24 pb-4 text-center text-muted-foreground',
                  active && 'text-card-foreground font-bold'
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
                  <TableHead onClick={handleSortByCandidateName} className='h-10 cursor-pointer rounded-l-lg'>
                    <div className='flex items-center'>
                      <p className='select-none'>Candidate Name</p>
                      <CandidateNameSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByAppliedJob} className='h-10 cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none'>Applied Job</p>
                      <AppliedJobSortIcon />
                    </div>
                  </TableHead>
                  <TableHead onClick={handleSortByCreatedAt} className='h-10 cursor-pointer'>
                    <div className='flex items-center'>
                      <p className='select-none'>Applied Date</p>
                      <CreatedAtSortIcon />
                    </div>
                  </TableHead>

                  <TableHead className='h-10 select-none text-center'>Status</TableHead>
                  <TableHead className='h-10 select-none text-nowrap rounded-r-lg text-end'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingApplicants && <TableRowsSkeleton colSpan={10} pageSize={pageSize} />}

                {data?.items?.map((applicant) => {
                  return (
                    <TableRow key={applicant.id}>
                      <TableCell>{applicant.fullName}</TableCell>
                      <TableCell>
                        <div className='flex items-center gap-x-3 font-semibold'>
                          <img
                            alt='job'
                            src={applicant.jobDetail.job.icon}
                            className='size-8 rounded-full object-cover'
                          />
                          <p>{applicant.jobDetail.job.name}</p>
                        </div>
                      </TableCell>

                      <TableCell>{toDate(applicant.createdAt)}</TableCell>
                      <TableCell className='text-center'>
                        <ApplicantBadge status={applicant.status} />
                      </TableCell>
                      <TableCell className='text-end'>
                        <DropdownSettingApplicant applicantId={applicant.id} status={applicant.status} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {!isLoadingApplicants && data?.items.length === 0 && (
          <div className='mt-36 text-center text-xl font-bold'>Not found any Recruitment Drives.</div>
        )}
      </div>

      {data && data.items.length > 0 && <Paginator metadata={data.metadata} />}
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
                      countApplicants={jd.countApplicants}
                      countApplicantsApproved={jd.countApplicantsApproved}
                      countApplicantsLastWeek={jd.countApplicantsLastWeek}
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
