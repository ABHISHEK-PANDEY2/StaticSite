import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'overview',
        path: '/overview',
        component: React.lazy(() => import('views/New/Overview/Overview.js')),
        authority: [],
    },
    {
        key: 'projectdashboard',
        path: '/projectdashboard',
        component: React.lazy(() =>
            import('views/New/ProjectDashboard/Projectdashboard.js')
        ),
        authority: [],
    },
    {
        key: 'hired',
        path: '/hired',
        component: React.lazy(() => import('views/New/Overview/Overview.js')),
        authority: [],
    },
    {
        key: 'tasks',
        path: '/tasks',
        component: React.lazy(() => import('views/New/Tasks/Tasks.js')),
        authority: [],
    },
    {
        key: 'scrumboard',
        path: '/scrumboard',
        component: React.lazy(() => import('views/New/Tasks/Scrum.js')),
        authority: [],
    },
    {
        key: 'standups',
        path: '/standups',
        component: React.lazy(() => import('views/New/Standups/Standups.js')),
        authority: [],
    },
    {
        key: 'performance',
        path: '/performance',
        component: React.lazy(() => import('views/New/Quote/index.js')),
        authority: [],
    },
    {
        key: '1on1',
        path: '/1on1',
        component: React.lazy(() => import('views/New/Quote/Quote.js')),
        authority: [],
    },
    {
        key: 'timesheets',
        path: '/timesheets',
        component: React.lazy(() => import('views/New/Static Site/EditSite.js')),
        authority: [],
    },
    {
        key: 'headquarters',
        path: '/headquarters',
        component: React.lazy(() => import('views/New/Overview/Overview.js')),
        authority: [],
    },
    {
        key: 'manageteams',
        path: '/manage-teams',
        component: React.lazy(() =>
            import('views/New/Manage Teams/TeamList.js')
        ),
        authority: [],
    },
    {
        key: 'teamdetails',
        path: '/team-details',
        component: React.lazy(() => import('views/New/Manage Teams/Teams.js')),
        authority: [],
    },
    {
        key: 'settings',
        path: '/settings/profile',
        component: React.lazy(() => import('views/New/Settings/index.js')),
        authority: [],
    },
]
