import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);



export async function getAllCategories() {
  const { data: product_details } = await supabase.from("Resources").select("*").eq("status", "published");

  const all_categories = Array.from(new Set(product_details.flatMap((product) => product.categories.split(';')))); // Need to convert "Set" in an array

  //all_categories.json()

  return {
    
        all_categories,

  }
}




