"use client";
import React, { useState } from "react";
import { Task } from "@/services/taskService";
import { useDeleteTask, useToggleTaskComplete } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import {
  Check,
  Edit,
  Trash2,
  Calendar,
  Flag,
  Clock,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const getPriorityColor = (priority?: number) => {
  switch (priority) {
    case 1:
      return "bg-success/10 text-success border-success/20 dark:bg-success/10 dark:text-success dark:border-success/20";
    case 2:
      return "bg-warning/10 text-warning border-warning/20 dark:bg-warning/10 dark:text-warning dark:border-warning/20";
    case 3:
      return "bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/10 dark:text-destructive dark:border-destructive/20";
    default:
      return "bg-muted/50 text-muted-foreground border-border dark:bg-muted/50 dark:text-muted-foreground dark:border-border";
  }
};

const getPriorityText = (priority?: number) => {
  switch (priority) {
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    default:
      return "No Priority";
  }
};

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);

  const deleteTaskMutation = useDeleteTask();
  const toggleTaskMutation = useToggleTaskComplete();

  const handleToggleComplete = () => {
    setShowCompleteDialog(true);
  };

  const confirmToggleComplete = () => {
    toggleTaskMutation.mutate(task.id);
    setShowCompleteDialog(false);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteTaskMutation.mutate(task.id);
    setShowDeleteDialog(false);
  };

  const isOverdue =
    task.due_date && new Date(task.due_date) < new Date() && !task.is_complete;
  const isLoading =
    deleteTaskMutation.isPending || toggleTaskMutation.isPending;

  return (
    <>
      <Card
        className={`transition-all duration-200 hover:shadow-md border ${
          task.is_complete
            ? "opacity-75 bg-muted/30 border-muted"
            : isOverdue
            ? "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10"
            : "border-border hover:border-primary/20"
        }`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleComplete}
                disabled={isLoading}
                className={`p-1 h-6 w-6 rounded-full border-2 transition-all duration-200 ${
                  task.is_complete
                    ? "bg-green-500 border-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:border-green-600"
                    : "border-muted-foreground/30 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  task.is_complete && <Check className="h-3 w-3" />
                )}
              </Button>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium text-sm leading-5 ${
                    task.is_complete
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {task.title}
                </h3>

                {task.description && (
                  <p
                    className={`text-sm mt-1 line-clamp-2 ${
                      task.is_complete
                        ? "text-muted-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {task.description}
                  </p>
                )}

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {task.priority && (
                    <Badge
                      variant="outline"
                      className={`text-xs ${getPriorityColor(task.priority)}`}
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      {getPriorityText(task.priority)}
                    </Badge>
                  )}

                  {task.due_date && (
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        isOverdue
                          ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                          : "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                      }`}
                    >
                      {isOverdue ? (
                        <Clock className="h-3 w-3 mr-1" />
                      ) : (
                        <Calendar className="h-3 w-3 mr-1" />
                      )}
                      {format(new Date(task.due_date), "MMM dd, yyyy")}
                    </Badge>
                  )}

                  <Badge
                    variant="outline"
                    className="text-xs text-muted-foreground"
                  >
                    {format(new Date(task.created_at), "MMM dd")}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                disabled={isLoading}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
              >
                <Edit className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={isLoading}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Task"
        description={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        type="destructive"
        confirmText="Delete"
        isLoading={deleteTaskMutation.isPending}
      />

      {/* Complete Task Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showCompleteDialog}
        onClose={() => setShowCompleteDialog(false)}
        onConfirm={confirmToggleComplete}
        title={task.is_complete ? "Mark as Incomplete" : "Mark as Complete"}
        description={
          task.is_complete
            ? `Mark "${task.title}" as incomplete?`
            : `Mark "${task.title}" as complete?`
        }
        type="success"
        confirmText={task.is_complete ? "Mark Incomplete" : "Mark Complete"}
        isLoading={toggleTaskMutation.isPending}
      />
    </>
  );
};
