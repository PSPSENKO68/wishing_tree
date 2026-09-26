import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type LeafType =
  | 'mint' | 'bay' | 'citrus' | 'coffee' | 'vanilla' | 'basil'
  | 'cherry' | 'apple' | 'sunflower' | 'rose' | 'tulip' | 'star';

export interface Message {
  id: string;
  sender_name: string;
  sender_role: string;
  message: string;
  photo_url: string | null;
  leaf_type: LeafType;
  position_x: number | null;
  position_y: number | null;
  is_approved: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  honoree_name: string;
  honoree_role: string;
  hero_title: string;
  hero_subtitle: string;
  footer_message: string;
  hero_background_url: string | null;
  updated_at: string;
}

export const LEAF_TYPES: LeafType[] = [
  'mint', 'bay', 'citrus', 'coffee', 'vanilla', 'basil',
  'cherry', 'apple', 'sunflower', 'rose', 'tulip', 'star',
];

export const LEAF_COLORS: Record<LeafType, string[]> = {
  // --- Leaves ---
  mint: ['#7C9070', '#8FA078', '#6B8055'],
  bay: ['#4E6E58', '#5A7B63', '#3F5A48'],
  citrus: ['#D98E4A', '#E0A060', '#C97E3A'],
  coffee: ['#6B4A34', '#8A5E42', '#5A3E2A'],
  vanilla: ['#C9A876', '#D4B888', '#B8966A'],
  basil: ['#9CAF88', '#A8B895', '#8A9E76'],
  // --- Fruits ---
  cherry: ['#C0392B', '#E74C3C', '#A93226'],
  apple: ['#27AE60', '#2ECC71', '#1E8449'],
  // --- Flowers ---
  sunflower: ['#F1C40F', '#F39C12', '#D4AC0D'],
  rose: ['#E91E63', '#F06292', '#C2185B'],
  tulip: ['#9B59B6', '#AF7AC5', '#7D3C98'],
  // --- Special ---
  star: ['#FFD700', '#FFEC8B', '#DAA520'],
};

export const LEAF_LABELS: Record<LeafType, string> = {
  mint: 'Mint',
  bay: 'Bay Leaf',
  citrus: 'Citrus Blossom',
  coffee: 'Coffee Bean',
  vanilla: 'Vanilla Pod',
  basil: 'Basil',
  cherry: 'Cherry',
  apple: 'Apple',
  sunflower: 'Sunflower',
  rose: 'Rose',
  tulip: 'Tulip',
  star: 'Star',
};
