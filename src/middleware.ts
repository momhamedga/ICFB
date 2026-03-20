import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const url = request.nextUrl.clone()

  // 1. حماية صفحات الأدمن (تعتمد على Auth)
  if (url.pathname.startsWith('/admin')) {
    const isLoginPage = url.pathname === '/admin/login'
    if (!user && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    if (user && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // 2. حماية صفحات الطالب (تعتمد على الكود وليس Auth)
  // نترك الحماية هنا لداخل الصفحات (Client-side) لأن الطالب ليس له User Object في Supabase Auth
  
  return response
}

export const config = {
  // نقوم بحماية مسارات الأدمن فقط عبر الميدل وير لمنع تعارض الـ Sessions
  matcher: ['/admin/:path*'],
}