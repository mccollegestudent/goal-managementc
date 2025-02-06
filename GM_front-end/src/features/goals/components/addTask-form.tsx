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
import { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAddTask } from "../hooks/use-addTask";
import { taskSchema, TaskSchema } from "../schemas/Task-schema";

interface addTaskFormProps {
    goalId: number,
    open: boolean
    setOpen: (value: boolean) => void
}

export function AddTaskForm({ goalId: id, open, setOpen }: addTaskFormProps) {

    const { mutate: add, isPending, isSuccess } = useAddTask();

    // 1. Define your form.
    const form = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            goalId: id
        }
    });

    useEffect(() => {
        if (isSuccess === true) {
            setOpen(false);
            form.reset();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (id > 0) {
            form.reset({
                goalId: id
            });
        }
    }, [id]);

    function onSubmit(values: TaskSchema) {
        add(values);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={() => {
                form.reset();
                setOpen(false);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new Task</DialogTitle>
                    <DialogDescription>
                        Achieve your goal step by step.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
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
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" {...field} maxLength={255} className="max-h-52" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className="flex justify-between">
                            <Button type="submit" disabled={isPending}>
                                Add Task
                            </Button>
                            <Button type="button" onClick={() => { setOpen(false) }} >Close</Button>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}