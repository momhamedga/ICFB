import CertificateVerifier from "@/components/certificate/CertificateVerifier";
import HeroSection from "@/components/hero/Hero";
import MentoringServices from "@/components/MentoringServices/MentoringServices";
import ServicesSection from "@/components/services/Services";
import StatsSection from "@/components/Stats/StatsSection";
import WhyChooseSection from "@/components/WhyChoose/WhyChooseSection";
import { supabase } from "@/lib/supabase";
import QualificationsPreview from "@/components/Qualification/QualificationsPreview";

export default async function Home() {
  const { data: qualifications } = await supabase
    .from("qualifications")
    .select("*")
    .limit(3)
    .order("created_at", { ascending: false });

return (
    // 1. شلنا الـ min-h-screen والـ bg-premium لأن الـ Layout بيقوم بالدور ده
    <div className="relative"> 
      
      <div className="relative z-10">
        <HeroSection />
        
        {/* 2. بدل bg-white الصريح، نستخدم شفافية بسيطة أو نعتمد على خلفية الـ Layout */}
        <div className="relative z-20 bg-white/80 backdrop-blur-md"> 
           <ServicesSection />
        </div>

        <div className="relative z-30"> 
           <WhyChooseSection />
        </div>

        <div id="qualifications-section" className="relative z-40"> 
          <QualificationsPreview data={qualifications || []} />
        </div>

        <div className="relative z-50 bg-white/80 backdrop-blur-md"> 
           <MentoringServices />
        </div>

        <div className="relative z-[55]"> 
           <CertificateVerifier />
        </div>

        {/* 3. القسم الأخير قبل الفوتر مباشرة - لازم يلحم مع الفوتر */}
        <div className="relative z-[60] bg-[#002d5b]"> 
           <StatsSection />
        </div>
      </div>
    </div>
  );
}