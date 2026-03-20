"use server";

import { eventService } from "@/services/adminService";
import { revalidatePath, revalidateTag } from 'next/cache';
// 1. جلب البيانات
export async function getAllEvents() {
  try {
    const data = await eventService.getAllEvents();
    return data || [];
  } catch (error) {
    console.error("Error in getAllEvents action:", error);
    return [];
  }
}

// 2. إضافة فعالية
export async function createEventAction(formData: any) {
  try {
    // التأكد من تنسيق التاريخ ليتوافق مع حقل date في Postgres
    const formattedDate = formData.date instanceof Date 
      ? formData.date.toISOString().split('T')[0] 
      : formData.date;

    // نقوم بإرسال الحقول المطلوبة فقط (بدون ID) لضمان عدم حدوث خطأ 500
    const data = await eventService.createEvent({
      title: formData.title,
      category: formData.category,
      date: formattedDate
    });

    revalidatePath("/events");
    revalidatePath("/admin/events"); 
    return data;
  } catch (error) {
    console.error("Failed to create event:", error);
    throw new Error("Create operation failed");
  }
}

// 3. حذف فعالية
export async function deleteEventAction(id: string) {
  try {
    await eventService.deleteEvent(id);
    revalidatePath("/events");
    revalidatePath("/admin/events");
  } catch (error) {
    console.error("Failed to delete event:", error);
    throw new Error("Delete operation failed");
  }
}

// 4. تحديث فعالية
// 4. تحديث فعالية
export async function updateEventAction(id: string, formData: any) {
  try {
    // 1. معالجة التاريخ لضمان أنه بصيغة YYYY-MM-DD
    const formattedDate = formData.date instanceof Date 
      ? formData.date.toISOString().split('T')[0] 
      : formData.date;

    // 2. تحديث البيانات في قاعدة البيانات
    const data = await eventService.updateEvent(id, {
      title: formData.title,
      category: formData.category,
      date: formattedDate 
    });

    // 3. إعادة التحقق من الكاش (Revalidation) بأسلوب آمن
    // استخدمنا revalidatePath لأنه الأشمل والأضمن في Next.js 15 حالياً
    try {
        revalidatePath("/events"); 
        revalidatePath("/admin/events");
        
        // إذا كان TypeScript لا يزال يعترض على revalidateTag بـ argument واحد، 
        // فـ revalidatePath كافية جداً لأداء المهمة.
        // revalidateTag("events-list"); 
    } catch (revalidateError) {
        console.warn("Revalidation non-critical error:", revalidateError);
    }

    return data;
  } catch (error) {
    console.error(`Failed to update event ${id}:`, error);
    throw new Error("Update failed");
  }
}