import AboutHero from "./AboutHero";
import FeaturesSection from "./FeaturesSection";
import StatsGrid from "./StatsGrid";
import VisionSection from "./VisionSection";
import WhyChooseUs from "./WhyChooseUs";


export default function AboutPage() {
    return (
        <main className="bg-[#fcfcfc] min-h-screen">
            <AboutHero />
            <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 space-y-32 pb-32">
                <StatsGrid />
                <VisionSection />
                <FeaturesSection/>
                <WhyChooseUs/>
            </div>
        </main>
    );
}