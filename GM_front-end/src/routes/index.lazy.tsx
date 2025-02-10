import { useAuth } from '@/features/auth/hooks/use-auth';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter();

  const { data: auth } = useAuth();

  useEffect(() => {
    if (auth) {
      router.navigate({ to: "/dashboard" });
    }
  }, [auth]);
  
  return null;
}
