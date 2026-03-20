// src/app/student/dashboard/page.tsx
import StudentDashboardClient from "@/components/dashboard/StudentDashboardClient";

export const metadata = {
  title: "Student Dashboard | ICFB",
  description: "Manage your professional coaching qualifications.",
};

export default function DashboardPage() {
  // ملاحظة: بما إننا بنستخدم localStorage للـ Auth حالياً، 
  // الـ Client Component هو اللي هيتعامل مع الـ Fetching.
  // لكن الصفحة هنا بقت Server-Rendered وده أحسن للأداء.
  return <StudentDashboardClient />;
}