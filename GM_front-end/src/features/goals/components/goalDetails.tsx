import { useForm } from "react-hook-form";
import { goalSchema, GoalSchema } from "../schemas/Goal-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addDays, format, parseISO, startOfToday } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Goal } from "../schemas/goalModels";
import { useUptGoal } from "../hooks/use-uptGoal";
import { useEffect } from "react";
import { useDeleteGoal } from "../hooks/use-deleteGoal";
import { Badge } from "@/components/ui/badge";
interface GoalDetailsProps {
    goal: Goal
}
export function GoalDetails({ goal }: GoalDetailsProps) {
    const { mutate: update, isPending } = useUptGoal();
    const {mutate: deleteGoal, isPending: deleteIsPending} = useDeleteGoal();
    
    function areAllTimeframesCompleted() {
        return goal.tasks.every(task => task.timeFrames ? task.timeFrames.every(timeframe => timeframe.status == true): false);
    }

    function isTimeFramesEmpty(){
        return goal.tasks.every(task=> task.timeFrames?.length == 0);
    }
    // 1. Define your form.
    const form = useForm<GoalSchema>({
        resolver: zodResolver(goalSchema),
        defaultValues: {
            id: goal.id,
            objective: goal.objective,
            description: goal.description,
            startDay: goal.startDate ? parseISO(goal.startDate) : undefined,
            endDay: goal.endDate ? parseISO(goal.endDate) : undefined,
        }

    });

    function handleDelete(){
        deleteGoal(goal.id);
    }
    useEffect(() => {
        if (goal) {
            form.reset({
                id: goal.id,
                objective: goal.objective,
                description: goal.description,
                startDay: goal.startDate ? parseISO(goal.startDate) : undefined,
                endDay: goal.endDate ?  parseISO(goal.endDate) : undefined,
            });
            console.log(goal.startDate);
            console.log(new Date(goal.startDate));
            console.log(goal);
        }

    }, [goal]);

    useEffect(() => {
        console.log(form);
    }, [form])



    function onSubmit(values: GoalSchema) {
        update(values);
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">

                <FormField
                    control={form.control}
                    name="objective"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-between font-bold">
                                Objective 
                                {areAllTimeframesCompleted() ? ( isTimeFramesEmpty() ? <Badge variant="secondary">Not started</Badge> : <Badge variant="completed">Achieved</Badge>) : <Badge variant="pending">In Progress</Badge>}
                            </FormLabel>
                            <FormControl>
                                <Input {...field} min="1" />
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
                            <FormLabel className="font-bold">Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description" {...field} maxLength={255} className="max-h-52" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-2">
                    <FormField
                        control={form.control}
                        name="startDay"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="font-bold">Start day</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[200px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < startOfToday() || date > form.getValues("endDay")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDay"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="font-bold">End day</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[200px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < startOfToday() || date < form.getValues("startDay")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between gap-10 border-b-2">
                    <Button type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={form.formState.isDirty || isPending||deleteIsPending}
                        className="w-[50%]">
                        Delete goal
                    </Button>
                    <Button type="submit" className="w-[50%] mb-5" disabled={!form.formState.isDirty || isPending}>
                        Update goal
                    </Button>
                </div>
                

            </form>
        </Form>

    );
}