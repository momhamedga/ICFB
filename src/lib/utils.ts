export const getFullImageUrl = (imagePath: string | null) => {
  if (!imagePath) return "https://via.placeholder.com/1200x800?text=No+Image";
  if (imagePath.startsWith('http')) return imagePath;
  const PROJECT_ID = "ildjspneaxcpasnnflcu"; 
  const cleanPath = imagePath.replace(/^\/+/, '');
  return `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/qualifications/${cleanPath}`;
};