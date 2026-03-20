"use server";

import { eventService } from "@/services/adminService";
import { revalidatePath } from 'next/cache';

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
    const formattedDate = formData.date instanceof Date 
      ? formData.date.toISOString().split('T')[0] 
      : formData.date;

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
export async function updateEventAction(id: string, formData: any) {
  try {
    const formattedDate = formData.date instanceof Date 
      ? formData.date.toISOString().split('T')[0] 
      : formData.date;

    const data = await eventService.updateEvent(id, {
      title: formData.title,
      category: formData.category,
      date: formattedDate 
    });

    // تحديث الكاش للمسارات المطلوبة فقط
    revalidatePath("/events"); 
    revalidatePath("/admin/events");

    return data;
  } catch (error) {
    console.error(`Failed to update event ${id}:`, error);
    throw new Error("Update failed");
  }
}