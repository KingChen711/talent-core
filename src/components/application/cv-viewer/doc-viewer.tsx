// DocViewer.tsx
import React from 'react'

// import FileViewer from 'react-file-viewer'

interface DocViewerProps {
  fileUrl: string
}

const DocViewer: React.FC<DocViewerProps> = ({ fileUrl }) => {
  // const fileType = fileUrl.split('.').pop() || ''

  // return (
  //   <FileViewer fileType={fileType} filePath={fileUrl} onError={(e) => console.error('Error in file viewer:', e)} />
  // )
  return null
}

export default DocViewer
