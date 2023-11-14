export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
export type Posts = Database['public']['Tables']['posts']['Row']
export type PostsKey<T extends keyof Database['public']['Tables']['posts']['Row']> = Database['public']['Tables']['posts']['Row'][T]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          title: string
          content: string
          pitch: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: number
          title: string
          content: string
          pitch: string
        }
        Update: {            // the data to be passed to .update()
          id?: never
          name?: string      // `not null` columns are optional on .update()
          data?: Json | null
        }
      }
    }
  }
}
