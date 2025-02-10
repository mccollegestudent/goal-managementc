import { Dashboard } from '@/components/dashboard'

import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <> 
    <Dashboard />
  </>
}
