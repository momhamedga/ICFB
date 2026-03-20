import { supabase } from "@/lib/supabase";

export interface IUploadCertificatePayload {
  code: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  file?: File; // جعلناه اختياري ليدعم التعديل بدون تغيير الملف
}

export const adminService = {
  /**
   * 1. إنشاء شهادة جديدة
   */
  async createCertificate(payload: IUploadCertificatePayload): Promise<void> {
    if (!payload.file) throw new Error("PDF file is required for new certificates");

    const fileExt = payload.file.name.split('.').pop();
    const fileName = `${payload.code}-${Date.now()}.${fileExt}`;
    
    // رفع الملف إلى Storage
    const { error: storageError } = await supabase.storage
      .from('certificates')
      .upload(fileName, payload.file);

    if (storageError) throw new Error(`Storage Error: ${storageError.message}`);

    // الحصول على الرابط العام
    const { data: { publicUrl } } = supabase.storage
      .from('certificates')
      .getPublicUrl(fileName);

    // حفظ البيانات في الجدول
    const { error: dbError } = await supabase
      .from('certificates')
      .insert([
        {
          cert_code: payload.code,
          student_name: payload.studentName,
          course_name: payload.courseName,
          issue_date: payload.issueDate,
          pdf_url: publicUrl
        }
      ]);

    if (dbError) throw new Error(`Database Error: ${dbError.message}`);
  },

  /**
   * 2. جلب جميع الشهادات (مرتبة من الأحدث للأقدم)
   */
  async getAllCertificates() {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * 3. تحديث شهادة موجودة (الدالة الجديدة)
   */
  async updateCertificate(id: string, payload: IUploadCertificatePayload): Promise<void> {
    let publicUrl = undefined;

    // أ- إذا تم اختيار ملف جديد أثناء التعديل
    if (payload.file && payload.file.size > 0) {
      const fileExt = payload.file.name.split('.').pop();
      const fileName = `${payload.code}-${Date.now()}.${fileExt}`;
      
      const { error: storageError } = await supabase.storage
        .from('certificates')
        .upload(fileName, payload.file);

      if (storageError) throw new Error(`Storage Error: ${storageError.message}`);

      const { data } = supabase.storage.from('certificates').getPublicUrl(fileName);
      publicUrl = data.publicUrl;

      // (اختياري) يمكنك هنا إضافة منطق لحذف الملف القديم من الـ Storage لتوفير المساحة
    }

    // ب- تجهيز البيانات للتحديث
    const updateData: any = {
      cert_code: payload.code,
      student_name: payload.studentName,
      course_name: payload.courseName,
      issue_date: payload.issueDate,
    };

    // نحدث رابط الـ PDF فقط إذا تم رفع ملف جديد
    if (publicUrl) {
      updateData.pdf_url = publicUrl;
    }

    const { error: dbError } = await supabase
      .from('certificates')
      .update(updateData)
      .eq('id', id);

    if (dbError) throw new Error(`Update Error: ${dbError.message}`);
  },

  /**
   * 4. حذف الشهادة (السجل + الملف)
   */
  async deleteCertificate(id: string): Promise<void> {
    const { data: cert } = await supabase
      .from('certificates')
      .select('pdf_url')
      .eq('id', id)
      .single();

    if (cert?.pdf_url) {
      const fileName = cert.pdf_url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('certificates')
          .remove([fileName]);
      }
    }

    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
  ,async getCertificatesCount(): Promise<number> {
    const { count, error } = await supabase
      .from('certificates')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count || 0;
  }
};


export const eventService = {
  /**
   * جلب جميع الفعاليات
   */
  async getAllEvents() {
    // التأكد من وجود المتغيرات قبل البدء (اختياري لحل مشكلة Turbopack)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
       console.error("Supabase URL is missing in the environment!");
    }

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * إضافة فعالية جديدة
   */
  async createEvent(payload: { title: string; category: string; date: Date | string }) {
    const dateStr = payload.date instanceof Date 
      ? payload.date.toISOString().split('T')[0] 
      : payload.date;

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title: payload.title,
          category: payload.category,
          date: dateStr,
        }
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /**
   * تحديث فعالية موجودة
   */
  async updateEvent(id: string, payload: { title: string; category: string; date: Date | string }) {
    const dateStr = payload.date instanceof Date 
      ? payload.date.toISOString().split('T')[0] 
      : payload.date;

    const { data, error } = await supabase
      .from('events')
      .update({
        title: payload.title,
        category: payload.category,
        date: dateStr,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Supabase Update Error:", error.message);
      throw new Error(error.message);
    }
    return data;
  },

  /**
   * حذف فعالية
   */
  async deleteEvent(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};