import { Suspense } from "react";
import { Metadata } from "next";
import EventsClientPage from "./eventsPrev"; 
import EventsSkeleton from "./EventsSkeleton"; 
import { getAllEvents } from "../actions/events"; 

export const metadata: Metadata = {
  title: "Events Protocol | Ultra-Modern Experiences",
  description: "Join our professional evolution events and institutional workshops.",
};

export default async function EventsPage() {
  // 1. ابدأ جلب البيانات (بدون await هنا عشان نمررها كـ Promise)
  const eventsPromise = getAllEvents();

  return (
    <main className="bg-[#fafafa] min-h-screen">
      {/* 2. الـ Suspense هيظهر الـ Skeleton لحد ما الـ Promise تجهز */}
      <Suspense fallback={<EventsSkeleton />}>
        {/* 3. بنمرر الـ Promise كاملة للمكون العميل */}
        <EventsClientPage eventsPromise={eventsPromise} />
      </Suspense>
    </main>
  );
}