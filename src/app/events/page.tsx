import { Suspense } from "react";
import { Metadata } from "next";
import EventsClientPage from "./eventsPrev"; 
import EventsSkeleton from "./EventsSkeleton"; 
// استيراد الدالة الصحيحة للجلب
import { getAllEvents } from "../actions/events"; 

export const metadata: Metadata = {
  title: "Events Protocol | Ultra-Modern Experiences",
  description: "Join our professional evolution events and institutional workshops.",
};

export default async function EventsPage() {
  // جلب الـ Promise الخاصة بجميع الفعاليات
  const eventsPromise = getAllEvents();

  return (
    <main className="bg-[#fafafa] min-h-screen">
      <Suspense fallback={<EventsSkeleton />}>
        {/* نمرر الـ Promise لـ eventsPrev ليقوم بعرضها */}
        <EventsClientPage eventsPromise={eventsPromise} />
      </Suspense>
    </main>
  );
}