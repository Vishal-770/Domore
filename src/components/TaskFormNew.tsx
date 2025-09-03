"use client";
import React, { useState, useEffect } from "react";
import { Task, CreateTaskData, UpdateTaskData } from "@/services/taskService";
import { useCreateTask, useUpdateTask } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Flag, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
}

export const TaskFormNew = ({ isOpen, onClose, task }: TaskFormProps) => {
  const [formData, setFormData] = useState<CreateTaskData>({
    title: "",
    description: "",
    due_date: "",
    priority: undefined,
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("09:00");

  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();

  const isLoading =
    createTaskMutation.isPending || updateTaskMutation.isPending;

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        due_date: task.due_date || "",
        priority: task.priority,
      });

      if (task.due_date) {
        const dueDate = new Date(task.due_date);
        setSelectedDate(dueDate);
        setSelectedTime(format(dueDate, "HH:mm"));
      } else {
        setSelectedDate(undefined);
        setSelectedTime("09:00");
      }
    } else {
      resetForm();
    }
  }, [task, isOpen]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      due_date: "",
      priority: undefined,
    });
    setSelectedDate(undefined);
    setSelectedTime("09:00");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    // Combine date and time if both are selected
    let dueDateTime: string | undefined;
    if (selectedDate) {
      const [hours, minutes] = selectedTime.split(":");
      const combinedDateTime = new Date(selectedDate);
      combinedDateTime.setHours(parseInt(hours), parseInt(minutes));
      dueDateTime = combinedDateTime.toISOString();
    }

    const taskData = {
      ...formData,
      due_date: dueDateTime,
      title: formData.title.trim(),
      description: formData.description?.trim() || undefined,
    };

    try {
      if (task) {
        await updateTaskMutation.mutateAsync({
          id: task.id,
          data: taskData as UpdateTaskData,
        });
      } else {
        await createTaskMutation.mutateAsync(taskData);
      }
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const getPriorityIcon = (priority: number) => {
    return (
      <Flag
        className={`h-4 w-4 ${
          priority === 3
            ? "text-destructive"
            : priority === 2
            ? "text-warning"
            : "text-success"
        }`}
      />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {task ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter task title"
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter task description (optional)"
              disabled={isLoading}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Priority */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Priority</Label>
              <Select
                value={formData.priority?.toString() || ""}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    priority: value ? parseInt(value) : undefined,
                  })
                }
                disabled={isLoading}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(1)}
                      Low Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="2">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(2)}
                      Medium Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="3">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(3)}
                      High Priority
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-11 w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                  {selectedDate && (
                    <div className="p-3 border-t">
                      <Label className="text-sm font-medium">Time</Label>
                      <Input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="mt-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedDate(undefined);
                          setSelectedTime("09:00");
                        }}
                        className="mt-2 w-full"
                      >
                        Clear Date
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.title.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : task ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
