import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const updateSearchCount = async (searchTerm, anime = null) => {
  if (searchTerm.length > 2) {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const { data, error } = await supabase
      .from("AnimesSearchTerms")
      .select("*")
      .eq("search_term", encodedSearchTerm);
    if (error) {
      console.error("Error fetching search terms:", error);
    } else {
      if (data.length > 0) {
        const { data: updatedData, error: updateError } = await supabase
          .from("AnimesSearchTerms")
          .update({ count: data[0].count + 1 })
          .eq("search_term", encodedSearchTerm);
        console.log(updatedData, "updatedData");
        if (updateError) {
          console.error("Error updating search term:", updateError);
        }
      } else {
        const { data, error } = await supabase
          .from("AnimesSearchTerms")
          .insert({
            search_term: encodedSearchTerm,
            count: 1,
            anime_id: anime.id,
            poster_url: anime.attributes.posterImage.small,
          });
        if (error) {
          console.error("Error inserting search term:", error);
        }
      }
    }
  }
};

export const getTrendingAnimes = async () => {
  const { data, error } = await supabase
    .from("AnimesSearchTerms")
    .select("*")
    .order("count", { ascending: false })
    .limit(5);
  if (error) {
    console.error("Error fetching trending animes:", error);
    return [];
  }
  return data;
};
