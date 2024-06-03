/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MainLayoutImport } from './routes/_main-layout'
import { Route as EmployeeLayoutImport } from './routes/_employee-layout'
import { Route as AuthLayoutImport } from './routes/_auth-layout'
import { Route as MainLayoutIndexImport } from './routes/_main-layout/index'
import { Route as EmployeeLayoutDashboardImport } from './routes/_employee-layout/dashboard'
import { Route as AuthLayoutSignUpImport } from './routes/_auth-layout/sign-up'
import { Route as AuthLayoutSignInImport } from './routes/_auth-layout/sign-in'
import { Route as EmployeeLayoutTestExamsIndexImport } from './routes/_employee-layout/test-exams/index'
import { Route as EmployeeLayoutRecruitmentDrivesIndexImport } from './routes/_employee-layout/recruitment-drives/index'
import { Route as EmployeeLayoutJobsIndexImport } from './routes/_employee-layout/jobs/index'
import { Route as EmployeeLayoutTestExamsCreateImport } from './routes/_employee-layout/test-exams/create'
import { Route as EmployeeLayoutRecruitmentDrivesCreateImport } from './routes/_employee-layout/recruitment-drives/create'
import { Route as EmployeeLayoutJobsCreateImport } from './routes/_employee-layout/jobs/create'
import { Route as EmployeeLayoutTestExamsTestExamIdTestSessionsImport } from './routes/_employee-layout/test-exams/$testExamId.test-sessions'
import { Route as EmployeeLayoutTestExamsTestExamIdEditImport } from './routes/_employee-layout/test-exams/$testExamId.edit'
import { Route as EmployeeLayoutTestExamsTestExamCodeJobsImport } from './routes/_employee-layout/test-exams/$testExamCode.jobs'
import { Route as EmployeeLayoutTestExamsTestExamCodeAddJobsImport } from './routes/_employee-layout/test-exams/$testExamCode.add-jobs'
import { Route as EmployeeLayoutRecruitmentDrivesRecruitmentDriveIdEditImport } from './routes/_employee-layout/recruitment-drives/$recruitmentDriveId.edit'
import { Route as EmployeeLayoutRecruitmentDrivesRecruitmentDriveIdDetailImport } from './routes/_employee-layout/recruitment-drives/$recruitmentDriveId.detail'
import { Route as EmployeeLayoutRecruitmentDrivesRecruitmentDriveCodeAddJobsImport } from './routes/_employee-layout/recruitment-drives/$recruitmentDriveCode.add-jobs'
import { Route as EmployeeLayoutJobsJobIdEditImport } from './routes/_employee-layout/jobs/$jobId.edit'
import { Route as EmployeeLayoutJobsJobCodeTestExamsImport } from './routes/_employee-layout/jobs/$jobCode.test-exams'
import { Route as EmployeeLayoutJobsJobCodeAddTestExamsImport } from './routes/_employee-layout/jobs/$jobCode.add-test-exams'

// Create/Update Routes

const MainLayoutRoute = MainLayoutImport.update({
  id: '/_main-layout',
  getParentRoute: () => rootRoute,
} as any)

const EmployeeLayoutRoute = EmployeeLayoutImport.update({
  id: '/_employee-layout',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_auth-layout',
  getParentRoute: () => rootRoute,
} as any)

const MainLayoutIndexRoute = MainLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => MainLayoutRoute,
} as any)

const EmployeeLayoutDashboardRoute = EmployeeLayoutDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => EmployeeLayoutRoute,
} as any)

const AuthLayoutSignUpRoute = AuthLayoutSignUpImport.update({
  path: '/sign-up',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutSignInRoute = AuthLayoutSignInImport.update({
  path: '/sign-in',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const EmployeeLayoutTestExamsIndexRoute =
  EmployeeLayoutTestExamsIndexImport.update({
    path: '/test-exams/',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutRecruitmentDrivesIndexRoute =
  EmployeeLayoutRecruitmentDrivesIndexImport.update({
    path: '/recruitment-drives/',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutJobsIndexRoute = EmployeeLayoutJobsIndexImport.update({
  path: '/jobs/',
  getParentRoute: () => EmployeeLayoutRoute,
} as any)

const EmployeeLayoutTestExamsCreateRoute =
  EmployeeLayoutTestExamsCreateImport.update({
    path: '/test-exams/create',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutRecruitmentDrivesCreateRoute =
  EmployeeLayoutRecruitmentDrivesCreateImport.update({
    path: '/recruitment-drives/create',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutJobsCreateRoute = EmployeeLayoutJobsCreateImport.update({
  path: '/jobs/create',
  getParentRoute: () => EmployeeLayoutRoute,
} as any)

const EmployeeLayoutTestExamsTestExamIdTestSessionsRoute =
  EmployeeLayoutTestExamsTestExamIdTestSessionsImport.update({
    path: '/test-exams/$testExamId/test-sessions',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutTestExamsTestExamIdEditRoute =
  EmployeeLayoutTestExamsTestExamIdEditImport.update({
    path: '/test-exams/$testExamId/edit',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutTestExamsTestExamCodeJobsRoute =
  EmployeeLayoutTestExamsTestExamCodeJobsImport.update({
    path: '/test-exams/$testExamCode/jobs',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutTestExamsTestExamCodeAddJobsRoute =
  EmployeeLayoutTestExamsTestExamCodeAddJobsImport.update({
    path: '/test-exams/$testExamCode/add-jobs',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutRecruitmentDrivesRecruitmentDriveIdEditRoute =
  EmployeeLayoutRecruitmentDrivesRecruitmentDriveIdEditImport.update({
    path: '/recruitment-drives/$recruitmentDriveId/edit',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutRecruitmentDrivesRecruitmentDriveIdDetailRoute =
  EmployeeLayoutRecruitmentDrivesRecruitmentDriveIdDetailImport.update({
    path: '/recruitment-drives/$recruitmentDriveId/detail',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutRecruitmentDrivesRecruitmentDriveCodeAddJobsRoute =
  EmployeeLayoutRecruitmentDrivesRecruitmentDriveCodeAddJobsImport.update({
    path: '/recruitment-drives/$recruitmentDriveCode/add-jobs',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutJobsJobIdEditRoute =
  EmployeeLayoutJobsJobIdEditImport.update({
    path: '/jobs/$jobId/edit',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutJobsJobCodeTestExamsRoute =
  EmployeeLayoutJobsJobCodeTestExamsImport.update({
    path: '/jobs/$jobCode/test-exams',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

const EmployeeLayoutJobsJobCodeAddTestExamsRoute =
  EmployeeLayoutJobsJobCodeAddTestExamsImport.update({
    path: '/jobs/$jobCode/add-test-exams',
    getParentRoute: () => EmployeeLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth-layout': {
      id: '/_auth-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_employee-layout': {
      id: '/_employee-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof EmployeeLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_main-layout': {
      id: '/_main-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof MainLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_auth-layout/sign-in': {
      id: '/_auth-layout/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof AuthLayoutSignInImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth-layout/sign-up': {
      id: '/_auth-layout/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof AuthLayoutSignUpImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_employee-layout/dashboard': {
      id: '/_employee-layout/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof EmployeeLayoutDashboardImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_main-layout/': {
      id: '/_main-layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof MainLayoutIndexImport
      parentRoute: typeof MainLayoutImport
    }
    '/_employee-layout/jobs/create': {
      id: '/_employee-layout/jobs/create'
      path: '/jobs/create'
      fullPath: '/jobs/create'
      preLoaderRoute: typeof EmployeeLayoutJobsCreateImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/recruitment-drives/create': {
      id: '/_employee-layout/recruitment-drives/create'
      path: '/recruitment-drives/create'
      fullPath: '/recruitment-drives/create'
      preLoaderRoute: typeof EmployeeLayoutRecruitmentDrivesCreateImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/test-exams/create': {
      id: '/_employee-layout/test-exams/create'
      path: '/test-exams/create'
      fullPath: '/test-exams/create'
      preLoaderRoute: typeof EmployeeLayoutTestExamsCreateImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/jobs/': {
      id: '/_employee-layout/jobs/'
      path: '/jobs'
      fullPath: '/jobs'
      preLoaderRoute: typeof EmployeeLayoutJobsIndexImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/recruitment-drives/': {
      id: '/_employee-layout/recruitment-drives/'
      path: '/recruitment-drives'
      fullPath: '/recruitment-drives'
      preLoaderRoute: typeof EmployeeLayoutRecruitmentDrivesIndexImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/test-exams/': {
      id: '/_employee-layout/test-exams/'
      path: '/test-exams'
      fullPath: '/test-exams'
      preLoaderRoute: typeof EmployeeLayoutTestExamsIndexImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/jobs/$jobCode/add-test-exams': {
      id: '/_employee-layout/jobs/$jobCode/add-test-exams'
      path: '/jobs/$jobCode/add-test-exams'
      fullPath: '/jobs/$jobCode/add-test-exams'
      preLoaderRoute: typeof EmployeeLayoutJobsJobCodeAddTestExamsImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/jobs/$jobCode/test-exams': {
      id: '/_employee-layout/jobs/$jobCode/test-exams'
      path: '/jobs/$jobCode/test-exams'
      fullPath: '/jobs/$jobCode/test-exams'
      preLoaderRoute: typeof EmployeeLayoutJobsJobCodeTestExamsImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/jobs/$jobId/edit': {
      id: '/_employee-layout/jobs/$jobId/edit'
      path: '/jobs/$jobId/edit'
      fullPath: '/jobs/$jobId/edit'
      preLoaderRoute: typeof EmployeeLayoutJobsJobIdEditImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/recruitment-drives/$recruitmentDriveCode/add-jobs': {
      id: '/_employee-layout/recruitment-drives/$recruitmentDriveCode/add-jobs'
      path: '/recruitment-drives/$recruitmentDriveCode/add-jobs'
      fullPath: '/recruitment-drives/$recruitmentDriveCode/add-jobs'
      preLoaderRoute: typeof EmployeeLayoutRecruitmentDrivesRecruitmentDriveCodeAddJobsImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/recruitment-drives/$recruitmentDriveId/detail': {
      id: '/_employee-layout/recruitment-drives/$recruitmentDriveId/detail'
      path: '/recruitment-drives/$recruitmentDriveId/detail'
      fullPath: '/recruitment-drives/$recruitmentDriveId/detail'
      preLoaderRoute: typeof EmployeeLayoutRecruitmentDrivesRecruitmentDriveIdDetailImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/recruitment-drives/$recruitmentDriveId/edit': {
      id: '/_employee-layout/recruitment-drives/$recruitmentDriveId/edit'
      path: '/recruitment-drives/$recruitmentDriveId/edit'
      fullPath: '/recruitment-drives/$recruitmentDriveId/edit'
      preLoaderRoute: typeof EmployeeLayoutRecruitmentDrivesRecruitmentDriveIdEditImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/test-exams/$testExamCode/add-jobs': {
      id: '/_employee-layout/test-exams/$testExamCode/add-jobs'
      path: '/test-exams/$testExamCode/add-jobs'
      fullPath: '/test-exams/$testExamCode/add-jobs'
      preLoaderRoute: typeof EmployeeLayoutTestExamsTestExamCodeAddJobsImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/test-exams/$testExamCode/jobs': {
      id: '/_employee-layout/test-exams/$testExamCode/jobs'
      path: '/test-exams/$testExamCode/jobs'
      fullPath: '/test-exams/$testExamCode/jobs'
      preLoaderRoute: typeof EmployeeLayoutTestExamsTestExamCodeJobsImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/test-exams/$testExamId/edit': {
      id: '/_employee-layout/test-exams/$testExamId/edit'
      path: '/test-exams/$testExamId/edit'
      fullPath: '/test-exams/$testExamId/edit'
      preLoaderRoute: typeof EmployeeLayoutTestExamsTestExamIdEditImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_employee-layout/test-exams/$testExamId/test-sessions': {
      id: '/_employee-layout/test-exams/$testExamId/test-sessions'
      path: '/test-exams/$testExamId/test-sessions'
      fullPath: '/test-exams/$testExamId/test-sessions'
      preLoaderRoute: typeof EmployeeLayoutTestExamsTestExamIdTestSessionsImport
      parentRoute: typeof EmployeeLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthLayoutRoute: AuthLayoutRoute.addChildren({
    AuthLayoutSignInRoute,
    AuthLayoutSignUpRoute,
  }),
  EmployeeLayoutRoute: EmployeeLayoutRoute.addChildren({
    EmployeeLayoutDashboardRoute,
    EmployeeLayoutJobsCreateRoute,
    EmployeeLayoutRecruitmentDrivesCreateRoute,
    EmployeeLayoutTestExamsCreateRoute,
    EmployeeLayoutJobsIndexRoute,
    EmployeeLayoutRecruitmentDrivesIndexRoute,
    EmployeeLayoutTestExamsIndexRoute,
    EmployeeLayoutJobsJobCodeAddTestExamsRoute,
    EmployeeLayoutJobsJobCodeTestExamsRoute,
    EmployeeLayoutJobsJobIdEditRoute,
    EmployeeLayoutRecruitmentDrivesRecruitmentDriveCodeAddJobsRoute,
    EmployeeLayoutRecruitmentDrivesRecruitmentDriveIdDetailRoute,
    EmployeeLayoutRecruitmentDrivesRecruitmentDriveIdEditRoute,
    EmployeeLayoutTestExamsTestExamCodeAddJobsRoute,
    EmployeeLayoutTestExamsTestExamCodeJobsRoute,
    EmployeeLayoutTestExamsTestExamIdEditRoute,
    EmployeeLayoutTestExamsTestExamIdTestSessionsRoute,
  }),
  MainLayoutRoute: MainLayoutRoute.addChildren({ MainLayoutIndexRoute }),
})

/* prettier-ignore-end */
