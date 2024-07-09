import { createClient } from "./client";

export async function fetchImageFromSupabase(imagePath: string) {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from("images") // Replace with your actual bucket name
    .createSignedUrl(imagePath, 60); // Replace with your actual image file name

  if (error) {
    console.error("Error downloading image:", error.message);
    return "";
  }

  return data.signedUrl;
}
