"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  type?: "destructive" | "warning" | "info" | "success";
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const icons = {
  destructive: XCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const iconColors = {
  destructive: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
  success: "text-green-600",
};

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  type = "info",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
}: ConfirmDialogProps) {
  const Icon = icons[type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Icon className={`h-6 w-6 ${iconColors[type]}`} />
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="mt-2">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={type === "destructive" ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
