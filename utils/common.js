import { supabase } from '@/lib/supabase';

export default async function getTotalFeaturedByCategory(category) {
    const { data: products, error } = await supabase
      .from('Resources')
      .select()
      .eq('categories', category)
    
    if (error) throw error
    
    const totalFeatured = products.reduce(
      (total, product) => total + (product.featured ? 1 : 0),
      0
    )
    
    return totalFeatured
  }
  