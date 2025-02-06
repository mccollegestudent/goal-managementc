import { Button } from '@/components/ui/button'
import { AddGoalForm } from '@/features/goals/components/addGoal-form';
import { GoalDetails } from '@/features/goals/components/goalDetails';
import GoalsAccordion from '@/features/goals/components/goalsCarousel';
import { TasksTable } from '@/features/goals/components/Tasks-table';
import { useGoals } from '@/features/goals/hooks/use-goals';
import { Goal } from '@/features/goals/schemas/goalModels';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createLazyFileRoute('/_protected/goals')({
    component: RouteComponent,
})

function RouteComponent() {
    const [openAG, setOpenAG] = useState(false);
   
    const { data } = useGoals();
    const [selectedGoalId, SetselectedGoalId] = useState(0);
    const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>(undefined);

    useEffect(() => {
        if (selectedGoalId != 0) {
            setSelectedGoal(data?.find((goal) => goal.id === selectedGoalId));
            console.log(selectedGoal);
        }
    }, [selectedGoalId, data]);

    return (
        <div className="min-h-screen flex flex-col p-6 bg-gray-50">
            <div className='flex justify-between'>
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Goals</h1>
                <div className="flex justify-between items-center mb-6">
                    <Button
                        variant="outline"
                        onClick={() => setOpenAG(true)}
                        className="bg-purple-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md"
                    >Add Goal</Button>
                </div>
            </div>
            <AddGoalForm open={openAG} setOpen={setOpenAG} />
            
            <div className="flex flex-row flex-grow gap-8">
                <div className="bg-white w-80 rounded-lg shadow-lg p-4 overflow-hidden">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Goals</h2>
                    <div className="max-h-[500px] overflow-y-auto">
                        <GoalsAccordion onSelect={(d) => SetselectedGoalId(d)} />
                    </div>
                </div>

                {selectedGoal && (
                    <div className="flex-1 bg-white rounded-lg shadow-lg border-l-4 border-purple-500 p-6">
                        <GoalDetails goal={selectedGoal} />
                        <div className="mt-6">
                            <TasksTable tasks={selectedGoal.tasks}
                             selectedGoalId={selectedGoal.id}
                             goalStartDate={selectedGoal.startDate}
                             goalEndDate={selectedGoal.endDate}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
