import { createLazyFileRoute } from '@tanstack/react-router'
import MyCalendar from '@/features/calendar/components/calendar'

export const Route = createLazyFileRoute('/_protected/calendar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <><MyCalendar /></>
}
