import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  
  const pathname = request.nextUrl.pathname
  const isAdminPath = pathname.startsWith('/admin')
  // استخدام startsWith عشان نتجنب مشكلة السلاش الزائدة
  const isLoginPage = pathname.startsWith('/admin/login')

  // منع الدخول لأي صفحة في /admin إلا لو كان مسجل دخول أو في صفحة اللوجن
  if (isAdminPath && !user && !isLoginPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    // استثناء ملفات الـ Static والصور عشان الـ Middleware ميعطلش تحميلها
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
}