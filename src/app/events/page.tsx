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
  const eventsPromise = getAllEvents();

  return (
    <main className="relative min-h-screen  overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <Suspense fallback={<EventsSkeleton />}>
        <EventsClientPage eventsPromise={eventsPromise} />
      </Suspense>
    </main>
  );
}