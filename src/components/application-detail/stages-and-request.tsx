import CandidateRequests from './candidate-requests'
import StagesDetail from './stages-detail'
import { useEffect, useRef, useState } from 'react'

import { ApplicationDetail } from '@/hooks/application/use-application'

type Props = {
  application: ApplicationDetail
  isCandidateView?: boolean
}

function StagesAndRequests({ isCandidateView = false, application }: Props) {
  const stagesSection = useRef<HTMLDivElement>(null)
  const [stagesSectionLoaded, setStagesSectionLoaded] = useState(false)

  useEffect(() => {
    if (stagesSection.current) {
      setStagesSectionLoaded(true)
    }
  }, [stagesSection])

  return (
    <>
      <div ref={stagesSection} className='col-span-9 rounded-lg bg-card p-6'>
        <h3 className='mb-5 text-xl font-semibold'>Stages detail</h3>

        <StagesDetail isCandidateView={isCandidateView} application={application} />
      </div>

      {stagesSectionLoaded && (
        <div
          style={{ maxHeight: `${stagesSection.current?.clientHeight}px` }}
          className='col-span-3 flex flex-col gap-y-4 rounded-lg bg-card px-4 py-6'
        >
          <h3 className='text-xl font-semibold'>{isCandidateView ? 'Your requests' : 'Candidate requests'}</h3>

          <CandidateRequests isCandidateView={isCandidateView} application={application} />
        </div>
      )}
    </>
  )
}

export default StagesAndRequests
