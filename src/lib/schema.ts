export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      friendships: {
        Row: {
          created_at: string;
          friend_id: string | null;
          id: number;
          status: Database['public']['Enums']['friendship_status'];
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          friend_id?: string | null;
          id?: number;
          status?: Database['public']['Enums']['friendship_status'];
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          friend_id?: string | null;
          id?: number;
          status?: Database['public']['Enums']['friendship_status'];
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'friendships_friend_id_fkey';
            columns: ['friend_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'friendships_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
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
      moods: {
        Row: {
          id: number;
          mood_color: string;
          mood_name: string;
        };
        Insert: {
          id?: number;
          mood_color: string;
          mood_name: string;
        };
        Update: {
          id?: number;
          mood_color?: string;
          mood_name?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string;
          bio: string | null;
          date_of_birth: string;
          full_name: string;
          id: string;
          user_name: string | null;
        };
        Insert: {
          avatar_url?: string;
          bio?: string | null;
          date_of_birth: string;
          full_name?: string;
          id: string;
          user_name?: string | null;
        };
        Update: {
          avatar_url?: string;
          bio?: string | null;
          date_of_birth?: string;
          full_name?: string;
          id?: string;
          user_name?: string | null;
        };
        Relationships: [];
      };
      shared_wishlists: {
        Row: {
          created_at: string;
          friendship_id: number;
          id: number;
          title: string;
          wishlist_id_one: number;
          wishlist_id_two: number;
        };
        Insert: {
          created_at?: string;
          friendship_id: number;
          id?: number;
          title?: string;
          wishlist_id_one: number;
          wishlist_id_two: number;
        };
        Update: {
          created_at?: string;
          friendship_id?: number;
          id?: number;
          title?: string;
          wishlist_id_one?: number;
          wishlist_id_two?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'shared_wishlists_friendship_id_fkey';
            columns: ['friendship_id'];
            isOneToOne: false;
            referencedRelation: 'friendships';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'shared_wishlists_wishlist_id_one_fkey';
            columns: ['wishlist_id_one'];
            isOneToOne: true;
            referencedRelation: 'wishlists';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'shared_wishlists_wishlist_id_two_fkey';
            columns: ['wishlist_id_two'];
            isOneToOne: true;
            referencedRelation: 'wishlists';
            referencedColumns: ['id'];
          },
        ];
      };
      shops: {
        Row: {
          id: number;
          link_name: string | null;
          link_url: string;
          user_id: string;
        };
        Insert: {
          id?: number;
          link_name?: string | null;
          link_url: string;
          user_id: string;
        };
        Update: {
          id?: number;
          link_name?: string | null;
          link_url?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'shops_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      suggestions: {
        Row: {
          confidence_score: number;
          created_at: string;
          created_by: string;
          description: string;
          id: string;
          name: string;
          reason: string;
          wishlist_id: number;
        };
        Insert: {
          confidence_score?: number;
          created_at?: string;
          created_by: string;
          description?: string;
          id?: string;
          name?: string;
          reason?: string;
          wishlist_id: number;
        };
        Update: {
          confidence_score?: number;
          created_at?: string;
          created_by?: string;
          description?: string;
          id?: string;
          name?: string;
          reason?: string;
          wishlist_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'suggestions_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'suggestions_wishlist_id_fkey';
            columns: ['wishlist_id'];
            isOneToOne: false;
            referencedRelation: 'wishlists';
            referencedColumns: ['id'];
          },
        ];
      };
      wishlists: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          is_private: boolean;
          is_shared: boolean;
          owner_id: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_private?: boolean;
          is_shared?: boolean;
          owner_id: string;
          title?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_private?: boolean;
          is_shared?: boolean;
          owner_id?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
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
      create_shared_wishlist: {
        Args: {
          user_id_one: string;
          user_id_two: string;
          shared_title: string;
        };
        Returns: number;
      };
      delete_avatar: {
        Args: {
          avatar_full_url: string;
        };
        Returns: Record<string, unknown>;
      };
      delete_storage_object: {
        Args: {
          bucket: string;
          object: string;
        };
        Returns: Record<string, unknown>;
      };
      get_shared_wishlists_with_friends: {
        Args: {
          current_user_id: string;
        };
        Returns: {
          id: number;
          title: string;
          wishlist_id_one: number;
          wishlist_id_two: number;
          friendship_id: number;
          created_at: string;
          friend_profile: Json;
        }[];
      };
      get_user_friends: {
        Args: {
          current_user_id: string;
        };
        Returns: {
          avatar_url: string;
          bio: string | null;
          date_of_birth: string;
          full_name: string;
          id: string;
          user_name: string | null;
        }[];
      };
    };
    Enums: {
      friendship_status: 'pending' | 'accepted' | 'declined' | 'blocked';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
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
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
