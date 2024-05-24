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
