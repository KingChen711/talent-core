import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_employee-layout/jobs')({
  component: JobsPage
})

function JobsPage() {
  return (
    <section className='flex flex-col'>
      <h3 className='text-3xl font-semibold'>Jobs</h3>
    </section>
  )
}

export default JobsPage
