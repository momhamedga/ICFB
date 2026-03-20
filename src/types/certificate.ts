// types/certificate.ts أو في أعلى الملف
export interface Certificate {
  id: string;
  cert_code: string;
  student_name: string;
  course_name?: string;
  issue_date?: string;
  pdf_url?: string;
  created_at: string;
}

export type AuthError = {
  message: string;
  status?: number;
};