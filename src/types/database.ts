export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          created_at: string | null;
          description: string | null;
          due_date: string | null;
          id: number;
          is_complete: boolean | null;
          priority: number | null;
          title: string;
          updated_at: string | null;
          user_id: number;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          due_date?: string | null;
          id?: number;
          is_complete?: boolean | null;
          priority?: number | null;
          title: string;
          updated_at?: string | null;
          user_id: number;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          due_date?: string | null;
          id?: number;
          is_complete?: boolean | null;
          priority?: number | null;
          title?: string;
          updated_at?: string | null;
          user_id?: number;
        };
      };
      user_profiles: {
        Row: {
          created_at: string;
          email: string | null;
          id: number;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: number;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: number;
          username?: string | null;
        };
      };
    };
  };
};

// Type aliases for easier use
export type Task = Database["public"]["Tables"]["tasks"]["Row"];
export type TaskInsert = Database["public"]["Tables"]["tasks"]["Insert"];
export type TaskUpdate = Database["public"]["Tables"]["tasks"]["Update"];

export type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];
export type UserProfileInsert =
  Database["public"]["Tables"]["user_profiles"]["Insert"];
export type UserProfileUpdate =
  Database["public"]["Tables"]["user_profiles"]["Update"];
