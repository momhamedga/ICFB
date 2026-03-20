import { notFound } from "next/navigation";
import { getQualificationById } from "@/app/actions/actions";

// المكونات الأساسية
import HeroSection from "@/components/qualifications[id]/HeroSection";
import ContentLayout from "@/components/qualifications[id]/components/ContentLayout";
import ActionSidebar from "@/components/qualifications[id]/ActionSidebar";

// المكون المبدع للموبايل (Sticky Dock)
import MobileActionDock from "@/components/qualifications[id]/components/MobileActionDock";

export default async function QualificationDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // جلب البيانات من السيرفر (Server Action)
  const course = await getQualificationById(id);

  if (!course) return notFound();

  return (
    <main className="min-h-screen bg-white selection:bg-[#ef4444] selection:text-white pb-20 md:pb-0">
      
      {/* 1. قسم الهيرو: (يدعم الـ Responsive والـ Order الجديد للموبايل) */}
      <HeroSection course={course} />

      {/* 2. الهيكل الرئيسي: (Grid System متطور) */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-24">
          
          {/* المحتوى التعليمي (يسار) */}
          <div className="lg:col-span-8 space-y-16 md:space-y-24">
            <ContentLayout course={course} />
          </div>

          {/* شريط الأدوات الجانبي (يمين - Sticky في الديسكتوب) */}
          <aside className="hidden lg:block lg:col-span-4">
            <ActionSidebar courseTitle={course.title} />
          </aside>
          
        </div>
      </section>

      {/* 3. إبداع الموبايل: (يظهر فقط عند التمرير في الشاشات الصغيرة) */}
      <MobileActionDock />

    </main>
  );
}