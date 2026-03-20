import ServicesContent from "@/components/servicesPage/ServicesContent";
import ServicesHero from "@/components/servicesPage/ServicesHero";
export const metadata = {
  title: "Professional Services | British Academy",
  description: "Strategic coaching and mentoring solutions for global leaders.",
};
export default function ServicesPage() {
  return (
    <main className="min-h-screen  pb-40 overflow-hidden">
      {" "}
      {/* الهيرو كـ Server Component لأنه ثابت بصرياً */} <ServicesHero />{" "}
      {/* المحتوى التفاعلي مفصول في ملف Client */}{" "}
      <div className="max-w-7xl mx-auto px-6">
        {" "}
        <ServicesContent />{" "}
      </div>{" "}
    </main>
  );
}
