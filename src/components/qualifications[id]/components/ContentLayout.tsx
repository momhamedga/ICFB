
import { GraduationCap } from "lucide-react";
import SectionHeading from "../UI/SectionHeading";
import StatGrid from "../StatGrid";
import RequirementsList from "../RequirementsList";

export default function ContentLayout({ course }: { course: any }) {
  return (
    <div className="space-y-24">
      <section className="space-y-12">
        <SectionHeading icon={<GraduationCap />} title="Program Overview" />
        <p className="text-zinc-500 text-xl leading-relaxed font-medium">
          {course.overview}
        </p>
      </section>

      <StatGrid />

      {course.requirements && (
        <RequirementsList requirements={course.requirements} />
      )}
    </div>
  );
}