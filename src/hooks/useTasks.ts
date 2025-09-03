import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  CreateTaskData,
  UpdateTaskData,
} from "@/services/taskService";

// Query keys
export const queryKeys = {
  tasks: ["tasks"] as const,
  tasksByDate: (date: string) => ["tasks", "by-date", date] as const,
  taskStats: ["tasks", "stats"] as const,
};

// Hook to fetch all tasks
export function useTasks() {
  return useQuery({
    queryKey: queryKeys.tasks,
    queryFn: async () => {
      const result = await getTasks();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data || [];
    },
  });
}

// Hook to create a new task
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) => createTask(data),
    onSuccess: (result) => {
      if (result.error) {
        throw new Error(result.error);
      }
      // Invalidate and refetch tasks
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.taskStats });
    },
    onError: (error) => {
      console.error("Failed to create task:", error);
    },
  });
}

// Hook to update a task
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskData }) =>
      updateTask(id, data),
    onSuccess: (result) => {
      if (result.error) {
        throw new Error(result.error);
      }
      // Invalidate and refetch tasks
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.taskStats });
    },
    onError: (error) => {
      console.error("Failed to update task:", error);
    },
  });
}

// Hook to delete a task
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: (result) => {
      if (result.error) {
        throw new Error(result.error);
      }
      // Invalidate and refetch tasks
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.taskStats });
    },
    onError: (error) => {
      console.error("Failed to delete task:", error);
    },
  });
}

// Hook to toggle task completion
export function useToggleTaskComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => toggleTaskComplete(id),
    onSuccess: (result) => {
      if (result.error) {
        throw new Error(result.error);
      }
      // Invalidate and refetch tasks
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.taskStats });
    },
    onError: (error) => {
      console.error("Failed to toggle task completion:", error);
    },
  });
}

// Hook to get task statistics
export function useTaskStats() {
  return useQuery({
    queryKey: queryKeys.taskStats,
    queryFn: async () => {
      const result = await getTasks();
      if (result.error) {
        throw new Error(result.error);
      }

      const tasks = result.data || [];
      const completedTasks = tasks.filter((task) => task.is_complete);
      const pendingTasks = tasks.filter((task) => !task.is_complete);
      const overdueTasks = pendingTasks.filter(
        (task) => task.due_date && new Date(task.due_date) < new Date()
      );

      // Priority distribution
      const priorityStats = {
        high: tasks.filter((task) => task.priority === 3).length,
        medium: tasks.filter((task) => task.priority === 2).length,
        low: tasks.filter((task) => task.priority === 1).length,
      };

      // Tasks by completion status
      const completionStats = {
        completed: completedTasks.length,
        pending: pendingTasks.length,
        overdue: overdueTasks.length,
      };

      // Weekly completion rate (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const recentTasks = tasks.filter(
        (task) => new Date(task.created_at) >= weekAgo
      );
      const recentCompleted = recentTasks.filter((task) => task.is_complete);

      const weeklyCompletionRate =
        recentTasks.length > 0
          ? Math.round((recentCompleted.length / recentTasks.length) * 100)
          : 0;

      // Tasks created per day (last 7 days)
      const dailyStats = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();

        const dayTasks = tasks.filter(
          (task) => new Date(task.created_at).toDateString() === dateStr
        );

        dailyStats.push({
          date: dateStr,
          created: dayTasks.length,
          completed: dayTasks.filter((task) => task.is_complete).length,
        });
      }

      return {
        total: tasks.length,
        completionRate:
          tasks.length > 0
            ? Math.round((completedTasks.length / tasks.length) * 100)
            : 0,
        weeklyCompletionRate,
        priorityStats,
        completionStats,
        dailyStats,
      };
    },
  });
}
