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
      google: {
        Row: {
          created_at: string
          id: number
          profile_id: number | null
          result: Json | null
          status: Database["public"]["Enums"]["search_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          profile_id?: number | null
          result?: Json | null
          status?: Database["public"]["Enums"]["search_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          profile_id?: number | null
          result?: Json | null
          status?: Database["public"]["Enums"]["search_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "google_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "google_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing: {
        Row: {
          created_at: string
          id: number
          profile_id: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
        }
        Insert: {
          created_at?: string
          id?: number
          profile_id?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
        }
        Update: {
          created_at?: string
          id?: number
          profile_id?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          birth_date: string | null
          city: string | null
          created_at: string
          first_name: string | null
          gender: string | null
          id: number
          last_name: string | null
          state: string | null
          user_id: string | null
        }
        Insert: {
          birth_date?: string | null
          city?: string | null
          created_at?: string
          first_name?: string | null
          gender?: string | null
          id?: number
          last_name?: string | null
          state?: string | null
          user_id?: string | null
        }
        Update: {
          birth_date?: string | null
          city?: string | null
          created_at?: string
          first_name?: string | null
          gender?: string | null
          id?: number
          last_name?: string | null
          state?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      removal: {
        Row: {
          created_at: string
          id: number
          note: string | null
          search_id: number | null
          status: Database["public"]["Enums"]["removal_status"] | null
        }
        Insert: {
          created_at?: string
          id?: number
          note?: string | null
          search_id?: number | null
          status?: Database["public"]["Enums"]["removal_status"] | null
        }
        Update: {
          created_at?: string
          id?: number
          note?: string | null
          search_id?: number | null
          status?: Database["public"]["Enums"]["removal_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "removal_search_id_fkey"
            columns: ["search_id"]
            isOneToOne: false
            referencedRelation: "search"
            referencedColumns: ["id"]
          },
        ]
      }
      search: {
        Row: {
          broker_id: number | null
          created_at: string
          id: number
          profile_id: number | null
          result: Json | null
          status: Database["public"]["Enums"]["search_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          broker_id?: number | null
          created_at?: string
          id?: number
          profile_id?: number | null
          result?: Json | null
          status?: Database["public"]["Enums"]["search_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          broker_id?: number | null
          created_at?: string
          id?: number
          profile_id?: number | null
          result?: Json | null
          status?: Database["public"]["Enums"]["search_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "search_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
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
      pricing_type: "one_year" | "two_year" | "annual_recurring"
      removal_status:
        | "queued"
        | "in_progress"
        | "need_customer_action"
        | "completed"
        | "failed"
      search_status: "queued" | "in_progress" | "completed" | "failed"
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

