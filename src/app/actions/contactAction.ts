"use server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// الأكشن الخاص بالتواصل (Contact)
export async function sendContactAction(prevState: any, formData: FormData) {
  return await processEmail(formData, "Contact Message");
}

// الأكشن الخاص بالحجز (Booking) - ده اللي كان ناقصك
export async function sendBookingAction(prevState: any, formData: FormData) {
  return await processEmail(formData, "Booking Request");
}

// فانكشن موحدة عشان الكود ميبقاش متكرر (Refactoring)
async function processEmail(formData: FormData, type: string) {
  await new Promise((res) => setTimeout(res, 800));

  const name = formData.get("name") || formData.get("from_name");
  const email = formData.get("email") || formData.get("reply_to");
  const message = formData.get("message") || formData.get("coaching_type");

  if (!process.env.RESEND_API_KEY) return { success: false, message: "CONFIG_ERROR" };

  try {
    const { error } = await resend.emails.send({
      from: 'ICFB System <info@britishacademy-ss.com>',
      to: ['britishacademy-ss.com'],
      subject: `[${type}] - From ${name}`,
      html: ``,
    });

    if (error) return { success: false, message: "FAILED" };
    return { success: true, message: "SUCCESS" };
  } catch (e) {
    return { success: false, message: "CRITICAL_ERROR" };
  }
}