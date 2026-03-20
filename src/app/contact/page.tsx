"use client";

import ContactHero from "@/components/Contact/ContactHero";
import ContactForm from "@/components/Contact/ContactForm";
import { ContactInfo } from "@/components/Contact/ContactInfo";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen ">
      <ContactHero />
      <div className="max-w-7xl mx-auto px-6 relative z-30 -mt-24 md:-mt-40 pb-32">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* الجانب الأيسر - معلومات التواصل */}
          <div className="w-full lg:w-1/3 space-y-6 pt-10">
             <ContactInfo icon={Mail} title="Direct Channel" value="info@icfb.life" desc="Secured communication." />
             <ContactInfo icon={Phone} title="Global Link" value="+44 123 456 789" desc="Live support Mon-Fri." />
             <ContactInfo icon={MapPin} title="Base Location" value="London, UK" desc="Innovation Square." />
          </div>
          {/* الجانب الأيمن - الفورم */}
          <div className="w-full lg:w-2/3">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}