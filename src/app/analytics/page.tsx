"use client";
import React, { useMemo } from "react";
import { useTasks } from "@/hooks/useTasks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Target,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  Award,
  Loader2,
} from "lucide-react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  differenceInDays,
} from "date-fns";

const AnalyticsPage = () => {
  const { data: tasks = [], isLoading, error } = useTasks();

  const analytics = useMemo(() => {
    if (tasks.length === 0) return null;

    const now = new Date();
    const lastWeek = startOfWeek(now);
    const thisWeek = endOfWeek(now);

    // Basic stats
    const completedTasks = tasks.filter((task) => task.is_complete);
    const pendingTasks = tasks.filter((task) => !task.is_complete);
    const overdueTasks = pendingTasks.filter(
      (task) => task.due_date && new Date(task.due_date) < now
    );

    // Priority distribution
    const priorityData = [
      {
        name: "High Priority",
        value: tasks.filter((task) => task.priority === 3).length,
        color: "#ef4444",
      },
      {
        name: "Medium Priority",
        value: tasks.filter((task) => task.priority === 2).length,
        color: "#f59e0b",
      },
      {
        name: "Low Priority",
        value: tasks.filter((task) => task.priority === 1).length,
        color: "#10b981",
      },
      {
        name: "No Priority",
        value: tasks.filter((task) => !task.priority || task.priority === 0)
          .length,
        color: "#6b7280",
      },
    ].filter((item) => item.value > 0);

    // Completion status
    const statusData = [
      { name: "Completed", value: completedTasks.length, color: "#10b981" },
      { name: "Pending", value: pendingTasks.length, color: "#3b82f6" },
      { name: "Overdue", value: overdueTasks.length, color: "#ef4444" },
    ].filter((item) => item.value > 0);

    // Weekly completion trend (last 7 days) - using updated_at for completed tasks
    const weeklyData = eachDayOfInterval({
      start: lastWeek,
      end: thisWeek,
    }).map((day) => {
      const dayTasks = completedTasks.filter((task) =>
        isSameDay(new Date(task.updated_at), day)
      );
      return {
        date: format(day, "EEE"),
        completed: dayTasks.length,
        day: format(day, "MMM dd"),
      };
    });

    // Monthly trend (last 30 days) - using updated_at for completion tracking
    const monthlyData = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000);
      const dayCompletedTasks = completedTasks.filter((task) =>
        isSameDay(new Date(task.updated_at), date)
      );
      return {
        date: format(date, "MMM dd"),
        completed: dayCompletedTasks.length,
        created: tasks.filter((task) =>
          isSameDay(new Date(task.created_at), date)
        ).length,
      };
    });

    // Performance metrics
    const completionRate =
      tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
    const avgTasksPerDay = tasks.length > 0 ? tasks.length / 30 : 0;
    // Use updated_at - created_at for completion time estimation
    const avgCompletionTime =
      completedTasks.length > 0
        ? completedTasks.reduce((acc, task) => {
            return (
              acc +
              differenceInDays(
                new Date(task.updated_at),
                new Date(task.created_at)
              )
            );
          }, 0) / completedTasks.length
        : 0;

    return {
      basic: {
        total: tasks.length,
        completed: completedTasks.length,
        pending: pendingTasks.length,
        overdue: overdueTasks.length,
        completionRate: Math.round(completionRate),
        avgTasksPerDay: Math.round(avgTasksPerDay * 10) / 10,
        avgCompletionTime: Math.round(avgCompletionTime * 10) / 10,
      },
      charts: {
        priority: priorityData,
        status: statusData,
        weekly: weeklyData,
        monthly: monthlyData,
      },
    };
  }, [tasks]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="mt-2 text-muted-foreground">Loading analytics...</p>
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
                Error Loading Analytics
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

  if (!analytics || tasks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
              <p className="text-muted-foreground mb-4">
                Create some tasks to see your analytics and productivity
                insights.
              </p>
              <Button onClick={() => (window.location.href = "/dashboard")}>
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "#10b981",
    },
    created: {
      label: "Created",
      color: "#3b82f6",
    },
    pending: {
      label: "Pending",
      color: "#f59e0b",
    },
    overdue: {
      label: "Overdue",
      color: "#ef4444",
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your productivity and task management insights
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.basic.total}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {analytics.basic.completionRate}%
            </div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.basic.avgTasksPerDay}
            </div>
            <p className="text-xs text-muted-foreground">Tasks per day</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Completion
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.basic.avgCompletionTime}
            </div>
            <p className="text-xs text-muted-foreground">Days to complete</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Task Status Distribution
            </CardTitle>
            <CardDescription>
              Overview of your task completion status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <Pie
                  data={analytics.charts.status}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analytics.charts.status.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Priority Distribution
            </CardTitle>
            <CardDescription>How you prioritize your tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <Pie
                  data={analytics.charts.priority}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                >
                  {analytics.charts.priority.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Weekly Completion Trend
            </CardTitle>
            <CardDescription>Tasks completed this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={analytics.charts.weekly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  labelFormatter={(value, payload) =>
                    payload?.[0]?.payload?.day || value
                  }
                />
                <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              30-Day Activity Trend
            </CardTitle>
            <CardDescription>
              Task creation vs completion over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={analytics.charts.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="created"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.8}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Performance Insights
          </CardTitle>
          <CardDescription>
            Your productivity summary and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700 mb-1">
                {analytics.basic.completed}
              </div>
              <div className="text-sm text-green-600 font-medium">
                Tasks Completed
              </div>
              <div className="text-xs text-green-500 mt-1">Great job!</div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700 mb-1">
                {analytics.basic.pending}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                Tasks Pending
              </div>
              <div className="text-xs text-blue-500 mt-1">Keep going!</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-700 mb-1">
                {analytics.basic.completionRate}%
              </div>
              <div className="text-sm text-purple-600 font-medium">
                Success Rate
              </div>
              <div className="text-xs text-purple-500 mt-1">
                {analytics.basic.completionRate >= 80
                  ? "Excellent!"
                  : analytics.basic.completionRate >= 60
                  ? "Good work!"
                  : "Room to improve"}
              </div>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-700 mb-1">
                {analytics.basic.overdue}
              </div>
              <div className="text-sm text-orange-600 font-medium">
                Overdue Tasks
              </div>
              <div className="text-xs text-orange-500 mt-1">
                {analytics.basic.overdue === 0
                  ? "Perfect timing!"
                  : "Catch up soon!"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
