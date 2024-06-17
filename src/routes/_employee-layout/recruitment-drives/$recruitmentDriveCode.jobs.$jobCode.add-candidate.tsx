import { UserWithRole } from '@/types'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import ApplicationForm, { InitialApplicationFormStates } from '@/components/forms/application.form'
import SearchCandidateForm from '@/components/forms/search-candidate-profile-form'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute(
  '/_employee-layout/recruitment-drives/$recruitmentDriveCode/jobs/$jobCode/add-candidate'
)({
  component: RecruitmentDriveAddCandidatePage
})

const initialApplicationFormStates = {
  bornYear: undefined,
  email: '',
  fullName: '',
  gender: undefined,
  phone: undefined
}

function RecruitmentDriveAddCandidatePage() {
  const router = useRouter()
  const { recruitmentDriveCode, jobCode } = Route.useParams()
  const [hasSearched, setHasSearched] = useState(false)
  const [initialStates, setInitialStates] = useState<InitialApplicationFormStates>(initialApplicationFormStates)

  useEffect(() => {
    if (!hasSearched) {
      setInitialStates(initialApplicationFormStates)
    }
  }, [hasSearched])

  const handleSearchedCandidateData = (email: string, data: UserWithRole | null) => {
    setInitialStates((prev) => ({
      ...prev,
      email
    }))

    if (!data) {
      setHasSearched(true)
      return
    }

    setInitialStates((prev) => ({
      ...prev,
      fullName: data.fullName,
      bornYear: data.bornYear || undefined,
      gender: data.gender || undefined,
      phone: data.phone || undefined
    }))

    setHasSearched(true)
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <div className='mb-5 text-2xl font-semibold'>Add candidate to {jobCode}</div>
        <Button variant='secondary' onClick={() => router.history.back()}>
          Cancel
        </Button>
      </div>

      <SearchCandidateForm
        hasSearched={hasSearched}
        setHasSearched={setHasSearched}
        handleSearchedCandidateData={handleSearchedCandidateData}
        isPending={false}
      />

      {hasSearched && (
        <ApplicationForm initialStates={initialStates} jobCode={jobCode} recruitmentDriveCode={recruitmentDriveCode} />
      )}
    </div>
  )
}

export default RecruitmentDriveAddCandidatePage
