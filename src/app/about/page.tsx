import AboutHero from "./AboutHero";
import FeaturesSection from "./FeaturesSection";
import StatsGrid from "./StatsGrid";
import VisionSection from "./VisionSection";
import WhyChooseUs from "./WhyChooseUs";

export default function AboutPage() {
    return (
        <main className="relative min-h-screen  overflow-hidden">
            {/* 1. طبقة الـ "Blueprint" الموحدة لكل الصفحة */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* شبكة هندسية ناعمة جداً */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px]" />
                
                {/* إضاءات خافتة (Ambient Glows) لكسر حدة الأبيض */}
                <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] bg-[#E63946]/[0.02] rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-[#003366]/[0.02] rounded-full blur-[100px]" />
            </div>

            {/* 2. المحتوى الأساسي */}
            <div className="relative z-10">
                <AboutHero />
                
                {/* الحاوية الرئيسية مع توزيع مسافات سينمائي */}
                <div className="max-w-7xl mx-auto px-6 -mt-20 md:-mt-28 relative z-20 space-y-40 md:space-y-64 pb-40">
                    
                    {/* كل قسم مغلف بـ motion لضمان دخول ناعم أثناء السكرول */}
                    <section>
                        <StatsGrid />
                    </section>

                    <section>
                        <VisionSection />
                    </section>

                    <section>
                        <FeaturesSection />
                    </section>

                    <section>
                        <WhyChooseUs />
                    </section>
                </div>
            </div>

            {/* 3. لمسة النهاية: تدرج سفلي يغلق الصفحة بنعومة */}
            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </main>
    );
}