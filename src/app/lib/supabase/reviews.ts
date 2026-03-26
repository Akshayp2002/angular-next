import { createSupabaseServerClient } from "./server";

export interface Review {
  id?: number;
  created_at?: string;
  name: string;
  position: string;
  company: string;
  review: string;
  rating: number;
  avatar: string;
  is_approved: boolean;
}

export async function getApprovedReviews() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }

  return data as Review[];
}

export async function submitReview(reviewData: Omit<Review, "id" | "created_at">) {
  const supabase = createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { data, error } = await supabase
    .from("reviews")
    .insert([{ ...reviewData, is_approved: false }]) // Reviews should be pending by default
    .select();

  if (error) {
    console.error("Error submitting review:", error);
    throw error;
  }

  return data;
}
