import CertificateVerifier from "@/components/CertificateVerifier";
import HeroSection from "@/components/Hero";
import MentoringServices from "@/components/MentoringServices";
import ServicesSection from "@/components/Services";
import StatsSection from "@/components/StatsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import { supabase } from "@/lib/supabase";
import QualificationsPreview from "@/components/QualificationsPreview";

export default async function Home() {
  const { data: qualifications } = await supabase
    .from("qualifications")
    .select("*")
    .limit(3)
    .order("created_at", { ascending: false });

  return (
    <main className="relative min-h-screen">
      <div className="bg-premium" />
      
      <div className="relative z-10">
        <HeroSection />
        
        <div className="relative z-20 bg-white"> 
           <ServicesSection />
        </div>

        <div className="relative z-30"> 
           <WhyChooseSection />
        </div>

        {/* هذا هو القسم الذي كان يختفي - الآن سيظهر دائماً */}
        <div id="qualifications-section" className="relative z-40"> 
          <QualificationsPreview data={qualifications || []} />
        </div>

        <div className="relative z-50 bg-white"> 
           <MentoringServices />
        </div>

        <div className="relative z-[55]"> 
           <CertificateVerifier />
        </div>

        <div className="relative z-60 bg-[#002d5b]"> 
           <StatsSection />
        </div>
      </div>
    </main>
  );
}