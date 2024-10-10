export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      brokers: {
        Row: {
          enable_scraping: boolean | null
          id: number
          name: string | null
          optout_url: string | null
          scraping_selector: string | null
          scraping_url: string | null
          site_url: string | null
        }
        Insert: {
          enable_scraping?: boolean | null
          id?: number
          name?: string | null
          optout_url?: string | null
          scraping_selector?: string | null
          scraping_url?: string | null
          site_url?: string | null
        }
        Update: {
          enable_scraping?: boolean | null
          id?: number
          name?: string | null
          optout_url?: string | null
          scraping_selector?: string | null
          scraping_url?: string | null
          site_url?: string | null
        }
        Relationships: []
      }
      credits: {
        Row: {
          created_at: string
          credits: number | null
          id: number
          updated_at: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          credits?: number | null
          id?: number
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          credits?: number | null
          id?: number
          updated_at?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credits_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credits_user_id_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          broker: number | null
          created_at: string
          id: number
          note: string | null
          removal_status: Database["public"]["Enums"]["removal_status"] | null
          result: Json | null
          status: Database["public"]["Enums"]["job_status"] | null
          updated_at: string | null
          user: string | null
        }
        Insert: {
          broker?: number | null
          created_at?: string
          id?: number
          note?: string | null
          removal_status?: Database["public"]["Enums"]["removal_status"] | null
          result?: Json | null
          status?: Database["public"]["Enums"]["job_status"] | null
          updated_at?: string | null
          user?: string | null
        }
        Update: {
          broker?: number | null
          created_at?: string
          id?: number
          note?: string | null
          removal_status?: Database["public"]["Enums"]["removal_status"] | null
          result?: Json | null
          status?: Database["public"]["Enums"]["job_status"] | null
          updated_at?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_broker_fkey"
            columns: ["broker"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          birth_date: string | null
          city: string | null
          first_name: string | null
          gender: number | null
          id: string
          last_name: string | null
          state: string | null
        }
        Insert: {
          birth_date?: string | null
          city?: string | null
          first_name?: string | null
          gender?: number | null
          id: string
          last_name?: string | null
          state?: string | null
        }
        Update: {
          birth_date?: string | null
          city?: string | null
          first_name?: string | null
          gender?: number | null
          id?: string
          last_name?: string | null
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      job_status: "queued" | "in_progress" | "completed" | "failed"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      removal_status: "requested" | "in_progress" | "completed" | "failed"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

