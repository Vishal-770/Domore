"use client";
import React, { useState, useMemo } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/services/taskService";
import { TaskCard } from "@/components/TaskCard";
import { TaskFormNew } from "@/components/TaskFormNew";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { cn } from "@/lib/utils";

const CalendarPage = () => {
  const { data: tasks = [], isLoading, error } = useTasks();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Get tasks for selected date
  const selectedDateTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.due_date) return false;
      return isSameDay(new Date(task.due_date), selectedDate);
    });
  }, [tasks, selectedDate]);

  // Get tasks for calendar display (current month)
  const monthTasks = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    const days = eachDayOfInterval({ start, end });

    return days.map((day) => {
      const dayTasks = tasks.filter((task) => {
        if (!task.due_date) return false;
        return isSameDay(new Date(task.due_date), day);
      });

      return {
        date: day,
        tasks: dayTasks,
        taskCount: dayTasks.length,
        completedCount: dayTasks.filter((task) => task.is_complete).length,
        overdueCount: dayTasks.filter(
          (task) => !task.is_complete && new Date(task.due_date!) < new Date()
        ).length,
      };
    });
  }, [tasks, currentMonth]);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleNewTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-80 w-full" />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Error Loading Calendar
              </h3>
              <p className="text-muted-foreground mb-4">{error.message}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Task Calendar</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your tasks in calendar view
          </p>
        </div>
        <Button onClick={handleNewTask} className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {format(currentMonth, "MMMM yyyy")}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMonth(new Date())}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-muted-foreground p-2"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {monthTasks.map((dayData, index) => {
                  const isCurrentMonth =
                    dayData.date.getMonth() === currentMonth.getMonth();
                  const isSelected = isSameDay(dayData.date, selectedDate);
                  const isTodayDate = isToday(dayData.date);

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(dayData.date)}
                      className={cn(
                        "min-h-[80px] p-2 border rounded-lg cursor-pointer transition-all hover:bg-accent",
                        isCurrentMonth
                          ? "bg-background"
                          : "bg-muted/30 text-muted-foreground",
                        isSelected && "ring-2 ring-primary",
                        isTodayDate && "bg-primary/5 border-primary/20"
                      )}
                    >
                      <div
                        className={cn(
                          "text-sm font-medium mb-1",
                          isTodayDate && "text-primary font-bold"
                        )}
                      >
                        {format(dayData.date, "d")}
                      </div>

                      {dayData.taskCount > 0 && (
                        <div className="space-y-1">
                          {dayData.completedCount > 0 && (
                            <div className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">
                              {dayData.completedCount} done
                            </div>
                          )}
                          {dayData.overdueCount > 0 && (
                            <div className="text-xs bg-red-100 text-red-800 px-1 py-0.5 rounded">
                              {dayData.overdueCount} overdue
                            </div>
                          )}
                          {dayData.taskCount -
                            dayData.completedCount -
                            dayData.overdueCount >
                            0 && (
                            <div className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                              {dayData.taskCount -
                                dayData.completedCount -
                                dayData.overdueCount}{" "}
                              pending
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Date Tasks */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {format(selectedDate, "MMM dd, yyyy")}
                </span>
                <Badge variant="outline">
                  {selectedDateTasks.length} tasks
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateTasks.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No tasks for this date</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNewTask}
                    className="mt-2"
                  >
                    Add a task
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">This Month Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total Tasks
                  </span>
                  <Badge variant="outline">{tasks.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    Completed
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    {tasks.filter((task) => task.is_complete).length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3 text-blue-500" />
                    Pending
                  </span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {tasks.filter((task) => !task.is_complete).length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-red-500" />
                    Overdue
                  </span>
                  <Badge variant="outline" className="bg-red-50 text-red-700">
                    {
                      tasks.filter(
                        (task) =>
                          !task.is_complete &&
                          task.due_date &&
                          new Date(task.due_date) < new Date()
                      ).length
                    }
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskFormNew
        isOpen={isFormOpen}
        onClose={handleFormClose}
        task={editingTask}
      />
    </div>
  );
};

export default CalendarPage;
