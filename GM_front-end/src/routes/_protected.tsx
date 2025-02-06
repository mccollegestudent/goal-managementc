import { SideBar } from '@/components/sidebar'
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import "@/index.css"
import { RightSideBar } from '@/components/rightSideBar'
import { useEffect } from 'react'
import { useAuth } from '@/features/auth/hooks/use-auth'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter();
  
    const { data: auth } = useAuth();
  
    useEffect(() => {
      if (!auth) {
        router.navigate({ to: "/home" });
      }
    }, [auth]);
  return (
      <div className="app flex">
        <SideBar />
        <main className="content flex-1  overflow-auto">
          <Outlet />
        </main>
        <RightSideBar />
      </div>
  )
}
