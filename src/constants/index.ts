export const employeeRoutes = [
  {
    route: '/dashboard',
    label: 'Dashboard',
    icon: (active: boolean) => (active ? '/icons/side-bar/dashboard-active.svg' : '/icons/side-bar/dashboard.svg')
  },
  {
    route: '/jobs',
    label: 'Jobs',
    icon: (active: boolean) => (active ? '/icons/side-bar/suitcase-active.svg' : '/icons/side-bar/suitcase.svg')
  },
  {
    route: '/test-exams',
    label: 'Test Exams',
    icon: (active: boolean) => (active ? '/icons/side-bar/test-exam-active.svg' : '/icons/side-bar/test-exam.svg')
  },
  {
    route: '/recruitment-drives',
    label: 'Recruitment Drives',
    icon: (active: boolean) => (active ? '/icons/side-bar/recruitment-active.svg' : '/icons/side-bar/recruitment.svg')
  }
] as const

export const jobTabs = [
  {
    label: 'All',
    status: 'all'
  },
  {
    label: 'Opening',
    status: 'opening'
  },
  {
    label: 'Closed',
    status: 'closed'
  }
] as const

export const recruitmentDriveTabs = [
  {
    label: 'All',
    status: 'all'
  },
  {
    label: 'Opening',
    status: 'opening'
  },
  {
    label: 'Closed',
    status: 'closed'
  }
] as const

export const applicationTabs = [
  {
    label: 'All',
    status: 'All'
  },
  {
    label: 'Screening',
    status: 'Screening'
  },
  {
    label: 'Testing',
    status: 'Testing'
  },
  {
    label: 'Interviewing',
    status: 'Interviewing'
  },
  {
    label: 'Approve',
    status: 'Approve'
  },
  {
    label: 'Saved',
    status: 'Saved'
  },
  {
    label: 'Reject',
    status: 'Reject'
  }
] as const

export const defaultJobIcon = '/icons/jobs/suitcase.png'

export const defaultAvatar = '/images/default-avatar.png'

export const jobsPageSize = 5
export const testExamsPageSize = 6

export const editorPlugin = {
  plugins:
    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker markdown',
  toolbar:
    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat'
}
