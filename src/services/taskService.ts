import { createClient } from "@/utils/supabase/client";

export interface Task {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
  due_date?: string;
  priority?: number;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  due_date?: string;
  priority?: number;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  due_date?: string;
  priority?: number;
  is_complete?: boolean;
}

// Get all tasks for the current user
export async function getTasks(): Promise<{
  data: Task[] | null;
  error: string | null;
}> {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return { data: null, error: "User not authenticated" };
    }

    // Get user profile to get the user_id
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("email", user.email)
      .single();

    if (profileError || !profile) {
      return { data: null, error: "User profile not found" };
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return { data: null, error: "An unexpected error occurred" };
  }
}

// Create a new task
export async function createTask(
  taskData: CreateTaskData
): Promise<{ data: Task | null; error: string | null }> {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return { data: null, error: "User not authenticated" };
    }

    // Get user profile to get the user_id
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("email", user.email)
      .single();

    if (profileError || !profile) {
      return { data: null, error: "User profile not found" };
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        ...taskData,
        user_id: profile.id,
      })
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Error creating task:", err);
    return { data: null, error: "An unexpected error occurred" };
  }
}

// Update an existing task
export async function updateTask(
  taskId: number,
  updates: UpdateTaskData
): Promise<{ data: Task | null; error: string | null }> {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return { data: null, error: "User not authenticated" };
    }

    // Get user profile to get the user_id
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("email", user.email)
      .single();

    if (profileError || !profile) {
      return { data: null, error: "User profile not found" };
    }

    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", taskId)
      .eq("user_id", profile.id) // Ensure user can only update their own tasks
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Error updating task:", err);
    return { data: null, error: "An unexpected error occurred" };
  }
}

// Delete a task
export async function deleteTask(
  taskId: number
): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, error: "User not authenticated" };
    }

    // Get user profile to get the user_id
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("email", user.email)
      .single();

    if (profileError || !profile) {
      return { success: false, error: "User profile not found" };
    }

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .eq("user_id", profile.id); // Ensure user can only delete their own tasks

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Error deleting task:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}

// Toggle task completion status
export async function toggleTaskComplete(
  taskId: number
): Promise<{ data: Task | null; error: string | null }> {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return { data: null, error: "User not authenticated" };
    }

    // Get user profile to get the user_id
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("email", user.email)
      .single();

    if (profileError || !profile) {
      return { data: null, error: "User profile not found" };
    }

    // First get the current task to toggle its completion status
    const { data: currentTask, error: fetchError } = await supabase
      .from("tasks")
      .select("is_complete")
      .eq("id", taskId)
      .eq("user_id", profile.id)
      .single();

    if (fetchError || !currentTask) {
      return { data: null, error: "Task not found" };
    }

    const { data, error } = await supabase
      .from("tasks")
      .update({ is_complete: !currentTask.is_complete })
      .eq("id", taskId)
      .eq("user_id", profile.id)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Error toggling task completion:", err);
    return { data: null, error: "An unexpected error occurred" };
  }
}
