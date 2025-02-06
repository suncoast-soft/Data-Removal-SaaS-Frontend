import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        return NextResponse.redirect(
          getStatusRedirect(
            `${origin}${next}`,
            'Success!',
            'You are now signed in.'
          )
        )
      } else if (forwardedHost) {
        return NextResponse.redirect(
          getStatusRedirect(
            `https://${forwardedHost}${next}`,
            'Success!',
            'You are now signed in.'
          )
        )
      } else {
        return NextResponse.redirect(
          getStatusRedirect(
            `${origin}${next}`,
            'Success!',
            'You are now signed in.'
          )
        )
      }
    }

    return NextResponse.redirect(
      getErrorRedirect(
        `${origin}/signin`,
        error.name,
        "Sorry, we weren't able to log you in. Please try again."
      )
    )
  }
}
