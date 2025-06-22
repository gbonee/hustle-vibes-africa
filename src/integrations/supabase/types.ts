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
      affiliate_clicks: {
        Row: {
          affiliate_url: string
          clicked_at: string
          commission_amount: number | null
          converted: boolean | null
          id: string
          tool_name: string
          user_id: string | null
        }
        Insert: {
          affiliate_url: string
          clicked_at?: string
          commission_amount?: number | null
          converted?: boolean | null
          id?: string
          tool_name: string
          user_id?: string | null
        }
        Update: {
          affiliate_url?: string
          clicked_at?: string
          commission_amount?: number | null
          converted?: boolean | null
          id?: string
          tool_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      app_users: {
        Row: {
          auth_id: string
          created_at: string
          id: string
          organization_id: string
          role: string
          selected_language: string | null
          updated_at: string
        }
        Insert: {
          auth_id: string
          created_at?: string
          id?: string
          organization_id: string
          role: string
          selected_language?: string | null
          updated_at?: string
        }
        Update: {
          auth_id?: string
          created_at?: string
          id?: string
          organization_id?: string
          role?: string
          selected_language?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      behavioral_triggers: {
        Row: {
          action_taken: string | null
          converted: boolean | null
          id: string
          trigger_type: string
          triggered_at: string
          user_id: string | null
        }
        Insert: {
          action_taken?: string | null
          converted?: boolean | null
          id?: string
          trigger_type: string
          triggered_at?: string
          user_id?: string | null
        }
        Update: {
          action_taken?: string | null
          converted?: boolean | null
          id?: string
          trigger_type?: string
          triggered_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      bounties: {
        Row: {
          assigned_to: string | null
          category: string
          client_id: string | null
          created_at: string | null
          currency: string | null
          deadline: string | null
          description: string
          difficulty_level: string | null
          id: string
          language_requirement: string | null
          path: string
          reward_amount: number
          skills_required: string[] | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          category: string
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          deadline?: string | null
          description: string
          difficulty_level?: string | null
          id?: string
          language_requirement?: string | null
          path: string
          reward_amount: number
          skills_required?: string[] | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string
          client_id?: string | null
          created_at?: string | null
          currency?: string | null
          deadline?: string | null
          description?: string
          difficulty_level?: string | null
          id?: string
          language_requirement?: string | null
          path?: string
          reward_amount?: number
          skills_required?: string[] | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      bounty_applications: {
        Row: {
          applicant_id: string | null
          bounty_id: string | null
          created_at: string | null
          estimated_timeline: string | null
          id: string
          proposal: string
          status: string | null
        }
        Insert: {
          applicant_id?: string | null
          bounty_id?: string | null
          created_at?: string | null
          estimated_timeline?: string | null
          id?: string
          proposal: string
          status?: string | null
        }
        Update: {
          applicant_id?: string | null
          bounty_id?: string | null
          created_at?: string | null
          estimated_timeline?: string | null
          id?: string
          proposal?: string
          status?: string | null
        }
        Relationships: []
      }
      challenge_submissions: {
        Row: {
          challenge_id: string
          id: string
          is_approved: boolean | null
          submission_type: string
          submission_url: string
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          id?: string
          is_approved?: boolean | null
          submission_type: string
          submission_url: string
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          id?: string
          is_approved?: boolean | null
          submission_type?: string
          submission_url?: string
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      course_categories: {
        Row: {
          color_scheme: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          path: string
        }
        Insert: {
          color_scheme?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          path: string
        }
        Update: {
          color_scheme?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          path?: string
        }
        Relationships: []
      }
      course_progress: {
        Row: {
          course_id: string
          created_at: string | null
          id: string
          last_module_completed: number | null
          modules_completed: number
          progress_percentage: number
          total_modules: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          id?: string
          last_module_completed?: number | null
          modules_completed?: number
          progress_percentage?: number
          total_modules?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          id?: string
          last_module_completed?: number | null
          modules_completed?: number
          progress_percentage?: number
          total_modules?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      demo_requests: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          role: string
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          role: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          role?: string
        }
        Relationships: []
      }
      leaderboard_entries: {
        Row: {
          completed_challenges: number
          created_at: string | null
          id: string
          points: number
          rank: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_challenges?: number
          created_at?: string | null
          id?: string
          points?: number
          rank?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_challenges?: number
          created_at?: string | null
          id?: string
          points?: number
          rank?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      learners: {
        Row: {
          completion_rate: number
          created_at: string
          email: string
          engagement_rate: number
          id: string
          name: string
          organization_id: string
          progress: number
          updated_at: string
        }
        Insert: {
          completion_rate?: number
          created_at?: string
          email: string
          engagement_rate?: number
          id?: string
          name: string
          organization_id: string
          progress?: number
          updated_at?: string
        }
        Update: {
          completion_rate?: number
          created_at?: string
          email?: string
          engagement_rate?: number
          id?: string
          name?: string
          organization_id?: string
          progress?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learners_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_modules: {
        Row: {
          content: Json
          created_at: string
          description: string | null
          id: string
          mentor: string
          title: string
          updated_at: string
        }
        Insert: {
          content: Json
          created_at?: string
          description?: string | null
          id?: string
          mentor: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          description?: string | null
          id?: string
          mentor?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      module_completion: {
        Row: {
          completed: boolean
          course_id: string
          created_at: string | null
          id: string
          module_id: number
          progress: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean
          course_id: string
          created_at?: string | null
          id?: string
          module_id: number
          progress?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean
          course_id?: string
          created_at?: string | null
          id?: string
          module_id?: number
          progress?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      one_time_purchases: {
        Row: {
          amount: number
          created_at: string
          id: string
          product_name: string
          status: string
          stripe_payment_intent_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          product_name: string
          status?: string
          stripe_payment_intent_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          product_name?: string
          status?: string
          stripe_payment_intent_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          is_pro_user: boolean | null
          learning_path: string | null
          preferred_languages: string[] | null
          pro_subscription_active: boolean | null
          pro_subscription_expires: string | null
          subscription_tier: string | null
          total_earnings: number | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          is_pro_user?: boolean | null
          learning_path?: string | null
          preferred_languages?: string[] | null
          pro_subscription_active?: boolean | null
          pro_subscription_expires?: string | null
          subscription_tier?: string | null
          total_earnings?: number | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_pro_user?: boolean | null
          learning_path?: string | null
          preferred_languages?: string[] | null
          pro_subscription_active?: boolean | null
          pro_subscription_expires?: string | null
          subscription_tier?: string | null
          total_earnings?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      skill_scan_results: {
        Row: {
          blueprints: Json
          budget: string
          created_at: string
          current_situation: string
          experience: string
          goals: string
          id: string
          selected_persona: string
          skills: string[]
          time_available: string
          updated_at: string
          user_id: string
        }
        Insert: {
          blueprints: Json
          budget: string
          created_at?: string
          current_situation: string
          experience: string
          goals: string
          id?: string
          selected_persona: string
          skills: string[]
          time_available: string
          updated_at?: string
          user_id: string
        }
        Update: {
          blueprints?: Json
          budget?: string
          created_at?: string
          current_situation?: string
          experience?: string
          goals?: string
          id?: string
          selected_persona?: string
          skills?: string[]
          time_available?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_tiers: {
        Row: {
          created_at: string
          features: Json
          id: string
          name: string
          price_monthly: number | null
          price_yearly: number | null
          stripe_price_id_monthly: string | null
          stripe_price_id_yearly: string | null
        }
        Insert: {
          created_at?: string
          features?: Json
          id?: string
          name: string
          price_monthly?: number | null
          price_yearly?: number | null
          stripe_price_id_monthly?: string | null
          stripe_price_id_yearly?: string | null
        }
        Update: {
          created_at?: string
          features?: Json
          id?: string
          name?: string
          price_monthly?: number | null
          price_yearly?: number | null
          stripe_price_id_monthly?: string | null
          stripe_price_id_yearly?: string | null
        }
        Relationships: []
      }
      user_certifications: {
        Row: {
          badge_url: string | null
          certification_name: string
          certification_type: string
          earned_at: string | null
          expires_at: string | null
          id: string
          partner_name: string | null
          user_id: string
          verification_url: string | null
        }
        Insert: {
          badge_url?: string | null
          certification_name: string
          certification_type: string
          earned_at?: string | null
          expires_at?: string | null
          id?: string
          partner_name?: string | null
          user_id: string
          verification_url?: string | null
        }
        Update: {
          badge_url?: string | null
          certification_name?: string
          certification_type?: string
          earned_at?: string | null
          expires_at?: string | null
          id?: string
          partner_name?: string | null
          user_id?: string
          verification_url?: string | null
        }
        Relationships: []
      }
      user_earnings: {
        Row: {
          amount: number
          bounty_id: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          source: string
          status: string | null
          user_id: string
        }
        Insert: {
          amount: number
          bounty_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          source: string
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          bounty_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          source?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_earnings_bounty_id_fkey"
            columns: ["bounty_id"]
            isOneToOne: false
            referencedRelation: "bounties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed: boolean
          completed_days: number[] | null
          created_at: string
          current_day: number | null
          has_first_client: boolean | null
          has_viral_post: boolean | null
          id: string
          last_activity: string | null
          module_id: string
          plateau_days: number | null
          progress: number
          total_earned: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_days?: number[] | null
          created_at?: string
          current_day?: number | null
          has_first_client?: boolean | null
          has_viral_post?: boolean | null
          id?: string
          last_activity?: string | null
          module_id: string
          plateau_days?: number | null
          progress?: number
          total_earned?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_days?: number[] | null
          created_at?: string
          current_day?: number | null
          has_first_client?: boolean | null
          has_viral_post?: boolean | null
          id?: string
          last_activity?: string | null
          module_id?: string
          plateau_days?: number | null
          progress?: number
          total_earned?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "learning_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier_name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier_name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier_name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
