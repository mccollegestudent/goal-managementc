import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Task, TimeFrame } from "../schemas/goalModels";
import { TaskDetailsDialog } from "./taskDetails-Dialog";
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { AddTaskForm } from './addTask-form';
import "../styles/style.css"
interface TasksDataGridProps {
  tasks: Task[],
  selectedGoalId: number,
  goalEndDate: string,
  goalStartDate: string
}

export function TasksTable({ tasks, selectedGoalId, goalEndDate, goalStartDate }: TasksDataGridProps) {
  const [open, setOpen] = useState(false);
  const [openAT, setOpenAT] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: 0,
    name: "",
    description: "",
    timeFrames: null
  });

  const handleOnClick = (task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  // const formatTimeFrames = (timeFrames: TimeFrame[] | null): string => {
  //   if (!timeFrames || timeFrames.length === 0) {
  //     return 'No Time Frame';
  //   }

  //   return timeFrames.map(tf => {
  //     const date = new Date(tf.date).toLocaleDateString();
  //     return `${date}: ${tf.startTime} - ${tf.endTime}`;
  //   }).join(', ');
  // };

  const getTimeFrameCount = (timeFrames: TimeFrame[] | null): number => {
    return timeFrames?.length || 0;
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Task Name', flex: 1 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
      field: 'timeFrameCount',
      headerName: 'Total Timeframes',
      width: 150,
      renderCell: (params) => getTimeFrameCount(params.row.timeFrames)
    }
  ];

  const rows: GridRowsProp = tasks.map((task) => ({
    id: task.id,
    name: task.name,
    description: task.description,
    timeFrames: task.timeFrames,
    timeFrameCount: getTimeFrameCount(task.timeFrames)
  }));

  useEffect(() => {
    if (selectedTask.id !== 0) {
      const task = tasks.find((t) => t.id === selectedTask.id);
      if (task) {
        setSelectedTask(task);
      }
    }
  }, [tasks, selectedTask.id]);

  return (
    <div className=" bg-gray-300 p-5 rounded-lg ">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-sm leading-none font-bold">Tasks</h1>
        <Button
          variant="outline"
          onClick={() => setOpenAT(true)}
          className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md"
        >Add Task</Button>
        <AddTaskForm goalId={selectedGoalId} open={openAT} setOpen={setOpenAT} />
      </div>
      <div style={{ height: "auto", width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={(params) => handleOnClick(params.row as Task)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </div>

      <TaskDetailsDialog open={open} setOpen={setOpen} task={selectedTask} goalEndDate={goalEndDate} goalStartDate={goalStartDate} />
    </div>
  );
}