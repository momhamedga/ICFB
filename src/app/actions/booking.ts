"use server";

import { Resend } from 'resend';

// التأكد من وجود الـ API Key لتجنب أخطاء التشغيل
const resend = new Resend(process.env.RESEND_API_KEY || 'RE_API_KEY_MISSING');

/**
 * دالة معالجة البريد الإلكتروني الموحدة
 * مصممة للعمل مع Next.js 15/16 و React 19 Action States
 */
async function processEmail(formData: FormData, type: string) {
  // محاكاة تأخير بسيط للـ UI الفخم الخاص بك
  await new Promise((res) => setTimeout(res, 1000));

  // استخراج البيانات مع قيم افتراضية لمنع الـ Null Errors
  const name = (formData.get("name") as string) || (formData.get("from_name") as string) || "Guest Agent";
  const senderEmail = (formData.get("email") as string) || (formData.get("reply_to") as string) || "no-reply@protocol.com";
  const message = (formData.get("message") as string) || (formData.get("coaching_type") as string) || "No Mission Briefing Provided";

  // التحقق من الإعدادات قبل الإرسال
  if (!process.env.RESEND_API_KEY) {
    console.error("[CRITICAL] Missing RESEND_API_KEY in Environment Variables.");
    return { success: false, message: "SERVER_CONFIG_ERROR" };
  }

  try {
    const { data, error } = await resend.emails.send({
      // استخدام الدومين الموثق الخاص بك [cite: 2026-03-20]
      from: 'ICFB System <info@britishacademy-ss.com>', 
      to: ['info@britishacademy-ss.com'], 
      reply_to: senderEmail,
      subject: `[${type.toUpperCase()}] - Uplink from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; border-radius: 24px; overflow: hidden; background-color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
          <div style="background-color: #001c30; padding: 50px 40px; text-align: center;">
            <h1 style="color: #ffffff; letter-spacing: 6px; text-transform: uppercase; margin: 0; font-size: 18px;">Uplink Received</h1>
            <p style="color: #E63946; font-size: 10px; margin-top: 10px; letter-spacing: 3px; font-weight: 900;">SECURE_TRANSMISSION_ACTIVE</p>
          </div>
          <div style="padding: 40px; color: #001c30;">
            <div style="margin-bottom: 25px; border-bottom: 1px solid #f5f5f5; padding-bottom: 15px;">
              <p style="font-size: 10px; font-weight: 900; color: #aaa; text-transform: uppercase; margin-bottom: 5px;">Identity</p>
              <p style="font-size: 16px; font-weight: bold; margin: 0;">${name}</p>
            </div>
            <div style="margin-bottom: 25px; border-bottom: 1px solid #f5f5f5; padding-bottom: 15px;">
              <p style="font-size: 10px; font-weight: 900; color: #aaa; text-transform: uppercase; margin-bottom: 5px;">Digital Mail</p>
              <p style="font-size: 16px; font-weight: bold; margin: 0;">${senderEmail}</p>
            </div>
            <div>
              <p style="font-size: 10px; font-weight: 900; color: #aaa; text-transform: uppercase; margin-bottom: 5px;">Mission Briefing</p>
              <p style="line-height: 1.6; font-weight: 500; color: #444; background: #f9f9f9; padding: 15px; border-radius: 12px; border-left: 4px solid #E63946;">${message}</p>
            </div>
          </div>
          <div style="background-color: #fcfcfc; padding: 25px; text-align: center; font-size: 10px; color: #ccc; letter-spacing: 2px;">
            BRITISH ACADEMY // PROFESSIONAL_EVOLUTION // 2026
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[RESEND_ERROR]:", error);
      return { success: false, message: error.message };
    }

    return { success: true, message: "MISSION_ACCOMPLISHED" };

  } catch (e) {
    console.error("[SYSTEM_FAILURE]:", e);
    return { success: false, message: "SYSTEM_CRITICAL_FAILURE" };
  }
}

/**
 * Actions المصدرة للاستخدام في المكونات
 */
export async function sendContactAction(prevState: any, formData: FormData) {
  return await processEmail(formData, "Contact");
}

export async function sendBookingAction(prevState: any, formData: FormData) {
  return await processEmail(formData, "Booking");
}