"use client";
import React, { useState, useMemo } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/services/taskService";
import { TaskCard } from "@/components/TaskCard";
import { TaskFormNew } from "@/components/TaskFormNew";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  CalendarIcon,
  Filter,
  SortAsc,
  Loader2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { format, isToday, isThisWeek, startOfDay, endOfDay } from "date-fns";
import { cn } from "@/lib/utils";

type FilterType =
  | "all"
  | "pending"
  | "completed"
  | "overdue"
  | "today"
  | "week";
type SortType = "created" | "priority" | "due_date" | "title";

const DashboardPageNew = () => {
  const { data: tasks = [], isLoading, error } = useTasks();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("created");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToComplete, setTaskToComplete] = useState<Task | null>(null);

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !task.title.toLowerCase().includes(query) &&
          !task.description?.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Date filter
      if (selectedDate) {
        if (!task.due_date) return false;
        const taskDate = new Date(task.due_date);
        const filterDate = selectedDate;
        return (
          taskDate >= startOfDay(filterDate) && taskDate <= endOfDay(filterDate)
        );
      }

      // Status filter
      switch (filter) {
        case "pending":
          return !task.is_complete;
        case "completed":
          return task.is_complete;
        case "overdue":
          return (
            !task.is_complete &&
            task.due_date &&
            new Date(task.due_date) < new Date()
          );
        case "today":
          return task.due_date && isToday(new Date(task.due_date));
        case "week":
          return task.due_date && isThisWeek(new Date(task.due_date));
        default:
          return true;
      }
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const aPriority = a.priority || 0;
          const bPriority = b.priority || 0;
          return bPriority - aPriority; // High to low
        case "due_date":
          if (!a.due_date && !b.due_date) return 0;
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return (
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "created":
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

    return filtered;
  }, [tasks, searchQuery, filter, sortBy, selectedDate]);

  const stats = useMemo(() => {
    const completedTasks = tasks.filter((task) => task.is_complete);
    const pendingTasks = tasks.filter((task) => !task.is_complete);
    const overdueTasks = pendingTasks.filter(
      (task) => task.due_date && new Date(task.due_date) < new Date()
    );
    const todayTasks = tasks.filter(
      (task) => task.due_date && isToday(new Date(task.due_date))
    );

    return {
      total: tasks.length,
      completed: completedTasks.length,
      pending: pendingTasks.length,
      overdue: overdueTasks.length,
      today: todayTasks.length,
      completionRate:
        tasks.length > 0
          ? Math.round((completedTasks.length / tasks.length) * 100)
          : 0,
    };
  }, [tasks]);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleMarkComplete = (task: Task) => {
    setTaskToComplete(task);
  };

  const handleConfirmComplete = () => {
    // This will be handled by the TaskCard's mutation
    setTaskToComplete(null);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="mt-2 text-muted-foreground">Loading your tasks...</p>
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
                Error Loading Tasks
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

  const pendingTasks = filteredAndSortedTasks.filter(
    (task) => !task.is_complete
  );
  const completedTasks = filteredAndSortedTasks.filter(
    (task) => task.is_complete
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Task Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your tasks and boost your productivity
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.pending}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <p className="text-xs text-muted-foreground">Finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.overdue}
            </div>
            <p className="text-xs text-muted-foreground">Past due</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rate</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">Completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Select
                value={filter}
                onValueChange={(value: FilterType) => setFilter(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="today">Due Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(value: SortType) => setSortBy(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created">Created Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="due_date">Due Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[140px] justify-start",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate
                      ? format(selectedDate, "MMM dd")
                      : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                  {selectedDate && (
                    <div className="p-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDate(undefined)}
                        className="w-full"
                      >
                        Clear Date
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Tasks Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Circle className="h-5 w-5 text-blue-500" />
              Pending Tasks
            </h2>
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {pendingTasks.length}
            </Badge>
          </div>

          <div className="space-y-3">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onMarkComplete={handleMarkComplete}
                />
              ))
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">
                    <Circle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No pending tasks</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Completed Tasks Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Completed Tasks
            </h2>
            <Badge
              variant="secondary"
              className="bg-green-50 text-green-700 border-green-200"
            >
              {completedTasks.length}
            </Badge>
          </div>

          <div className="space-y-3">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
              ))
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No completed tasks</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredAndSortedTasks.length === 0 && tasks.length > 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setFilter("all");
                setSelectedDate(undefined);
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Empty State - No tasks at all */}
      {tasks.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first task to get started with your productivity
              journey.
            </p>
            <Button onClick={() => setIsFormOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Task
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Task Form Modal */}
      <TaskFormNew
        isOpen={isFormOpen}
        onClose={handleFormClose}
        task={editingTask}
      />

      {/* Mark Complete Confirmation */}
      {taskToComplete && (
        <ConfirmDialog
          isOpen={!!taskToComplete}
          onClose={() => setTaskToComplete(null)}
          onConfirm={handleConfirmComplete}
          title="Mark Task as Complete"
          description={`Great job! Mark "${taskToComplete.title}" as completed?`}
          type="success"
          confirmText="Mark Complete"
        />
      )}
    </div>
  );
};

export default DashboardPageNew;
