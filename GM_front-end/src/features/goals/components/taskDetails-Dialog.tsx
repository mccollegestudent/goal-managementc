import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { taskSchema, TaskSchema } from "../schemas/Task-schema";
import { Task, TimeFrameRequest } from "../schemas/goalModels";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon, DeleteIcon, DiamondPlus } from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays, format, parseISO, startOfToday } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useUptTask } from "../hooks/use-uptTask";
import dayjs, { Dayjs } from 'dayjs';
import { DateRange as muiDateRange } from '@mui/x-date-pickers-pro/models';
import { useAddTimeFrame } from "../hooks/use-addTimeFrame";
import { toast } from "sonner";
import { useDeleteTimeFrame } from "../hooks/use-deleteTimeFrame";
import { useDeleteTask } from "../hooks/use-deleteTask";
import { Switch } from "@/components/ui/switch";
import { useUptTimeFrameStatus } from "../hooks/use-uptTimeFrameStatus";
import { Progress } from "@/components/ui/progress";
import { DialogContentNoX, DialogDescriptionNoX, DialogHeaderNoX, DialogNoX, DialogTitleNoX } from "@/components/ui/dialogNoX";
interface TaskDetailsDialogProps {
    task: Task,
    open: boolean
    setOpen: (value: boolean) => void,
    goalEndDate: string,
    goalStartDate: string
}

export function TaskDetailsDialog({ task, open, setOpen, goalEndDate, goalStartDate }: TaskDetailsDialogProps) {

    const { mutate: update, isPending } = useUptTask();
    const { mutate: addTimeFrame, isPending: addTFPending } = useAddTimeFrame();
    const { mutate: deleteTimeFrame, isPending: deleteTFPending } = useDeleteTimeFrame();
    const { mutate: deleteTask, isPending: deleteIsPending } = useDeleteTask();
    const { mutate: updateTFStatus } = useUptTimeFrameStatus();
    const [progress, setProgress] = useState(0);
    //const {data: goals} = useGoals();
    const [date, setDate] = useState<DateRange | undefined>({
        from: startOfToday(),
        to: startOfToday(),
    })
    const [value, setValue] = useState<muiDateRange<Dayjs>>(() => [
        dayjs(),
        dayjs().add(3, 'hour'),
    ]);

    function handleTimeFrameDelete(id: number) {
        deleteTimeFrame(id);
    }

    function handleTimeFrameStatusChange(id: number) {
        updateTFStatus(id);
    }

    function handleDelete(id: number) {
        deleteTask(id, {
            onSuccess: () => {
                setOpen(false);
            }
        });
    }

    function handleTimeFrameCreation() {
        if (date?.from && value[0] && value[1]) {
            if (isBeforeStripingTime(date.from, startOfToday())) {
                toast.error("The selected date range must be in the future.");
                return;
            }
            if (value[0] && value[0].isBefore(dayjs(), 'hour')) {
                toast.error("The selected time range must be in the future.");
                return;
            }
            const newtf: TimeFrameRequest = {
                taskId: task.id,
                startDate: format(date.from, "yyyy-MM-dd"),
                endDate: format(date.to ? date.to : date.from, "yyyy-MM-dd"),
                startTime: value[0].format("HH:mm:ss"),
                endTime: value[1].format("HH:mm:ss"),
            };
            addTimeFrame(newtf);
        }
        else if (!date?.from) {
            toast.warning("Date is required.")
        }
        else {
            toast.warning("Time range is required.")
        }
    }

    function isBeforeStripingTime(date1: Date, date2: Date) {
        const stripTime = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

        const strippedDate1 = stripTime(date1);
        const strippedDate2 = stripTime(date2);

        return strippedDate1 < strippedDate2;
    }

    // 1. Define your form.
    const form = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            id: task.id,
            name: task.name,
            description: task.description
        }
    });


    useEffect(() => {
        if (task) {
            console.log("useEffect triguered")
            form.reset({
                id: task.id,
                name: task.name,
                description: task.description
            });
            const completedTimeFrames = task.timeFrames?.filter(tf => tf.status).length || 0;
            const totalTimeFrames = task.timeFrames?.length || 0;
            const progressPercentage = totalTimeFrames > 0 ? (completedTimeFrames / totalTimeFrames) * 100 : 1;
            setProgress(progressPercentage > 0 ? progressPercentage : 1);
        }
    }, [task]);

    function onSubmit(values: TaskSchema) {
        update(values);
    }

    return (
        <DialogNoX
            open={open}
            onOpenChange={() => {
                form.reset();
                setOpen(false);
            }}
            

        >



            <DialogContentNoX className="flex flex-col md:flex-row gap-6 p-6 max-w-4xl">

                <div className="flex-1 min-w-[320px]">
                    
                    <DialogHeaderNoX className="mb-4">
                        <DialogTitleNoX className="text-xl font-semibold">Task</DialogTitleNoX>
                        <DialogDescriptionNoX className="text-sm text-muted-foreground">
                            <Progress value={progress} className="w-[60%]" indicatorClassName={cn(progress > 30 ? "bg-green-500" : (progress > 60 ? "bg-purple-500" : "bg-yellow-500"))} />
                        </DialogDescriptionNoX>
                    </DialogHeaderNoX>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-medium">Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} min="1" className="w-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-medium">Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Description"
                                                {...field}
                                                maxLength={255}
                                                className="w-full min-h-[100px] max-h-52 resize-y"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-between items-center pt-4">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => handleDelete(task.id)}
                                    disabled={form.formState.isDirty || isPending || deleteIsPending}
                                    className="flex items-center gap-2"
                                >
                                    Delete Task
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!form.formState.isDirty || isPending}
                                    className="flex items-center gap-2"
                                >
                                    Update
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="flex-1 min-w-[320px] space-y-4 ">
                <div className="flex justify-between items-center w-full text-sm font-medium text-muted-foreground mb-4">
                        <div>
                            <span className="font-semibold text-black">Goal Start Date: </span>
                            {format(parseISO(goalStartDate), "LLL dd, yyyy")}
                        </div>
                        <div>
                            <span className="font-semibold text-black">Goal End Date: </span>
                            {format(parseISO(goalEndDate), "LLL dd, yyyy")}
                        </div>
                    </div>
                    <h1 className="text-lg font-semibold">TimeFrames</h1>

                    <div className="space-y-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                    disabled=
                                    {(date) =>
                                        date < addDays(parseISO(goalStartDate), -1) || date > parseISO(goalEndDate) || date < startOfToday()
                                    }

                                />
                            </PopoverContent>
                        </Popover>

                        <div className="flex items-center gap-4">
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <SingleInputTimeRangeField
                                    label="From - To"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    className="w-full"
                                />
                            </LocalizationProvider>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleTimeFrameCreation}
                                disabled={addTFPending}
                                className="flex items-center gap-2"
                            >
                                <DiamondPlus className="h-4 w-4" />
                                New
                            </Button>
                        </div>
                    </div>

                    <ScrollArea className="h-72 rounded-md border">
                        <div className="p-4 space-y-2">
                            {task.timeFrames?.map((tf) => (
                                <figure
                                    key={tf.id}
                                    className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="text-sm font-medium">
                                        <span className="text-muted-foreground"> {format( parseISO(tf.date), "LLL dd, y")}</span>
                                        <span className="mx-2">|</span>
                                        <span>{format( parseISO(`${tf.date}T${tf.startTime}`), "hh:mm a")}</span>
                                        <span className="mx-2">-</span>
                                        <span>{format( parseISO(`${tf.date}T${tf.endTime}`), "hh:mm a")}</span>
                                    </div>
                                    <div>
                                        {(new Date(`${tf.date}T${tf.startTime}`) < new Date()) && (
                                            <Switch checked={tf.status} onCheckedChange={() => { handleTimeFrameStatusChange(tf.id) }} />
                                        )}

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleTimeFrameDelete(tf.id)}
                                            disabled={deleteTFPending}
                                            className="hover:bg-destructive/10 hover:text-destructive"
                                        >
                                            <DeleteIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </figure>
                            ))}
                        </div>
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="w-24"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContentNoX>
        </DialogNoX>
    );
}