import { eventService } from "@/services/adminService";

import { Suspense } from "react";
import EventPageAll from "./eventsPage";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export default function Page() {
  // بنجيب الـ Promise هنا وبنبعته للـ Client Component
  const eventsPromise = eventService.getAllEvents();

  return (
    <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white font-black animate-pulse">LOADING PROTOCOLS...</div>}>
      <EventPageAll eventsPromise={eventsPromise} />
    </Suspense>
  );
}