export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      items: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          image_url: string | null;
          is_bought: boolean;
          link: string | null;
          name: string;
          price: number | null;
          priority: number | null;
          wishlist_id: number | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image_url?: string | null;
          is_bought?: boolean;
          link?: string | null;
          name?: string;
          price?: number | null;
          priority?: number | null;
          wishlist_id?: number | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          image_url?: string | null;
          is_bought?: boolean;
          link?: string | null;
          name?: string;
          price?: number | null;
          priority?: number | null;
          wishlist_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'items_wishlist_id_fkey';
            columns: ['wishlist_id'];
            isOneToOne: false;
            referencedRelation: 'wishlists';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string;
          bio: string | null;
          date_of_birth: string;
          full_name: string;
          id: string;
          is_verified: boolean;
          is_volunteer: boolean;
          user_name: string | null;
        };
        Insert: {
          avatar_url?: string;
          bio?: string | null;
          date_of_birth: string;
          full_name?: string;
          id: string;
          is_verified?: boolean;
          is_volunteer?: boolean;
          user_name?: string | null;
        };
        Update: {
          avatar_url?: string;
          bio?: string | null;
          date_of_birth?: string;
          full_name?: string;
          id?: string;
          is_verified?: boolean;
          is_volunteer?: boolean;
          user_name?: string | null;
        };
        Relationships: [];
      };
      wishlists: {
        Row: {
          bg_image: string | null;
          created_at: string;
          description: string | null;
          id: number;
          joint_with: string | null;
          location: string | null;
          monobank_url: string | null;
          owner_id: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          bg_image?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          joint_with?: string | null;
          location?: string | null;
          monobank_url?: string | null;
          owner_id: string;
          title?: string;
          updated_at?: string;
        };
        Update: {
          bg_image?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          joint_with?: string | null;
          location?: string | null;
          monobank_url?: string | null;
          owner_id?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'wishlists_joint_with_fkey';
            columns: ['joint_with'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlists_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
