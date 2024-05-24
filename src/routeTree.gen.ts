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
import { Route as EmployeeLayoutJobsImport } from './routes/_employee-layout/jobs'
import { Route as EmployeeLayoutDashboardImport } from './routes/_employee-layout/dashboard'
import { Route as AuthLayoutSignUpImport } from './routes/_auth-layout/sign-up'
import { Route as AuthLayoutSignInImport } from './routes/_auth-layout/sign-in'

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

const EmployeeLayoutJobsRoute = EmployeeLayoutJobsImport.update({
  path: '/jobs',
  getParentRoute: () => EmployeeLayoutRoute,
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
    '/_employee-layout/jobs': {
      id: '/_employee-layout/jobs'
      path: '/jobs'
      fullPath: '/jobs'
      preLoaderRoute: typeof EmployeeLayoutJobsImport
      parentRoute: typeof EmployeeLayoutImport
    }
    '/_main-layout/': {
      id: '/_main-layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof MainLayoutIndexImport
      parentRoute: typeof MainLayoutImport
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
    EmployeeLayoutJobsRoute,
  }),
  MainLayoutRoute: MainLayoutRoute.addChildren({ MainLayoutIndexRoute }),
})

/* prettier-ignore-end */
