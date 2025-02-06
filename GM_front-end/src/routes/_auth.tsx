import { BasePage } from '@/components/base-page'
import { useAuth } from '@/features/auth/hooks/use-auth';
import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth) {
      router.navigate({ to: "/dashboard" });
    }
  }, [auth]);
  return <BasePage>
    <Outlet />
  </BasePage>


}
