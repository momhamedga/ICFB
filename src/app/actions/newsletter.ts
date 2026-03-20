// src/app/actions/newsletter.ts
"use server";

export async function subscribeAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  // محاكاة الاتصال بـ API مثل Mailchimp
  await new Promise(res => setTimeout(res, 1000));
  return { success: true, message: "System Access Granted" };
}