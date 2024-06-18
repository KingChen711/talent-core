import DocViewer from './doc-viewer'
import PdfViewer from './pdf-viewer'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { getFile } from '../../../lib/utils'

type Props = {
  fileUrl: string
}

function CvViewer({ fileUrl }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [fileUrl],
    queryFn: async () => getFile(fileUrl)
  })

  console.log({ data })

  if (isLoading || !data) return null

  switch (data.fileType) {
    case 'application/pdf':
      return <PdfViewer file={data.base64} />
    // case 'doc':
    // case 'docx':
    //   return <DocViewer fileUrl={data.base64} />
    default:
      return <div>Unsupported file type</div>
  }
}
export default CvViewer
