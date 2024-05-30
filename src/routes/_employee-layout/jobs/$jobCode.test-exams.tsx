import { Button } from '@/components/ui/button'
import useJobTestExams from '@/hooks/job/use-job-test-exams'
import { TestExam } from '@prisma/client'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/_employee-layout/jobs/$jobCode/test-exams')({
  component: JobTestExamsPage
})

function JobTestExamsPage() {
  const { jobCode } = Route.useParams()

  // const { data, isPending } = useJobTestExams(jobCode)

  return (
    <section className='flex flex-col'>
      <div className='flex items-center justify-between gap-x-5'>
        <h3 className='mb-4 text-2xl font-semibold'>Test Exams of {jobCode}</h3>

        <Button asChild>
          <Link to={`/jobs/${jobCode}/add-test-exams`}>
            <Plus className='mr-1 size-5' />
            Add Test Exams
          </Link>
        </Button>
      </div>
    </section>
  )
}

export default JobTestExamsPage
