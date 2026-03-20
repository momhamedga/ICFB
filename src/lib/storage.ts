import { supabase } from "./supabase";

/**
 * يرفع الملف (صورة أو PDF) إلى Supabase Storage ويعيد الرابط العام
 * @param file - الملف المختار (صورة للمؤهلات أو PDF للشهادات)
 * @param bucketOrFolder - اسم الـ Bucket المستهدف (مثل 'qualifications' أو 'certificates')
 * @returns الرابط العام للملف (Public URL)
 */
export const uploadCertificate = async (file: File, bucketOrFolder: string = 'certificates'): Promise<string> => {
  
  // 1. التأكد من أن الملف مدعوم (PDF أو صور)
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only PDF files and Images (JPG, PNG, WebP) are allowed');
  }

  // 2. تجهيز اسم فريد للملف لمنع تعارض الأسماء في الـ Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

  // 3. عملية الرفع إلى Supabase Storage
  const { error: uploadError, data } = await supabase.storage
    .from(bucketOrFolder) // يستخدم الـ Bucket الممرر (مثل qualifications)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true // لتحديث الملف إذا كان الاسم موجوداً مسبقاً
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // 4. الحصول على الرابط العام (Public URL) للملف المرفوع
  const { data: urlData } = supabase.storage
    .from(bucketOrFolder)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};