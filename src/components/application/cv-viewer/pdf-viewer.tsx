import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

type Props = {
  file: string
}

const PdfViewer = ({ file }: Props) => {
  return (
    <div className='overflow-hidden'>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`}>
        <Viewer fileUrl={file} />
      </Worker>
    </div>
  )
}

export default PdfViewer
