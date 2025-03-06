'use server'

import { createClient } from '@/utils/supabase/server'
import { getErrorRedirect, getStatusRedirect, getURL } from 'utils/helpers'
import { redirect } from 'next/navigation'
import { createProfile } from '../supabase/mutations'
import { getUser } from '../supabase/queries'

interface FormData {
  [key: string]: string | number | boolean
}

export async function redirectToPath(path: string) {
  return redirect(path)
}

export async function SignOut(formData: FormData) {
  const pathName = String(formData['pathName']).trim()

  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return getErrorRedirect(
      pathName,
      'Hmm... Something went wrong.',
      'You could not be signed out.'
    )
  }

  return '/auth/login'
}

export async function signUpWithPassword(formData: FormData) {
  const email = String(formData['email']).trim()
  const password = String(formData['password']).trim()

  const supabase = await createClient()
  const user = await getUser(supabase)

  if (user?.is_anonymous) {
    const { data: updatedData, error: updateError } =
      await supabase.auth.updateUser({
        email,
        password
      })

    console.log(updatedData)
    console.log(updateError)

    if (updateError) {
      return getErrorRedirect(
        '/auth/register',
        'Sign up failed.',
        updateError.message
      )
    }

    return updatedData.user
      ? getStatusRedirect(
          '/auth/login',
          'Success!',
          'Please check your email for a confirmation link. You may now close this tab.'
        )
      : getStatusRedirect('/dashboard', 'Success!', 'You are now signed in.')
  } else {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getURL('/auth/callback/supabase')
      }
    })

    if (error) {
      return getErrorRedirect(
        '/auth/register',
        'Sign up failed.',
        error.message
      )
    }

    if (data.session) {
      return getStatusRedirect(
        '/dashboard',
        'Success!',
        'You are now signed in.'
      )
    }

    return data.user
      ? getStatusRedirect(
          '/dashboard',
          'Success!',
          'Please check your email for a confirmation link. You may now close this tab.'
        )
      : getErrorRedirect(
          '/auth/register',
          'Sign up failed.',
          'Internal Server Error. Please try again.'
        )
  }
}

export async function signInWithPassword(formData: FormData) {
  const email = String(formData['email']).trim()
  const password = String(formData['password']).trim()

  const supabase = await createClient()
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return getErrorRedirect('/auth/login', 'Sign in failed.', error.message)
  }

  return data.user
    ? getStatusRedirect('/dashboard', 'Success!', 'You are now signed in.')
    : getErrorRedirect(
        '/auth/login',
        'Sign in failed.',
        'You could not be signed in. Please try again'
      )
}

export async function requestPasswordUpdate(formData: FormData) {
  const email = String(formData['email']).trim()

  const supabase = await createClient()

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: getURL('/auth/callback/reset-password')
  })

  if (error) {
    return getErrorRedirect(
      '/auth/forgot-password',
      error.message,
      'Please try again.'
    )
  } else if (data) {
    return getStatusRedirect(
      '/auth/forgot-password',
      'Success!',
      'Please check your email for a password reset link. You may now close this tab.',
      true
    )
  } else {
    return getErrorRedirect(
      '/auth/forgot-password',
      'Hmm... Something went wrong.',
      'Password reset email could not be sent.'
    )
  }
}

export async function updatePassword(formData: FormData) {
  const password = String(formData['password1'])
  const passwordConfirm = String(formData['password2'])

  if (password !== passwordConfirm) {
    return getErrorRedirect(
      '/auth/update-password',
      'Your password could not be updated.',
      'Passwords do not match.'
    )
  }

  const supabase = await createClient()
  const { error, data } = await supabase.auth.updateUser({
    password
  })

  if (error) {
    return getErrorRedirect(
      '/auth/update-password',
      'Your password could not be updated.',
      error.message
    )
  } else if (data.user) {
    return getStatusRedirect(
      '/auth/login',
      'Success!',
      'Your password has been updated.'
    )
  } else {
    return getErrorRedirect(
      '/auth/update-password',
      'Hmm... Something went wrong.',
      'Your password could not be updated.'
    )
  }
}

export async function signInWithOtp(formData: FormData) {
  const email = String(formData['email']).trim()

  const supabase = await createClient()
  const user = await getUser(supabase)

  if (user) {
    const { data: updatedData, error: updateError } =
      await supabase.auth.updateUser({
        email: email
      })

    if (updateError) {
      console.log(
        'This email belongs to an existing user. signing in to that account.'
      )

      const { error, data } = await supabase.auth.signInWithOtp({
        email: email
      })

      if (error) {
        return getErrorRedirect('/auth/login', 'Sign ip failed.', error.message)
      }

      return data.user
        ? getStatusRedirect(
            '/auth/login',
            'Success!',
            'Please check your email for a confirmation link. You may now close this tab.'
          )
        : getStatusRedirect('/dashboard', 'Success!', 'You are now signed in.')
    }

    return updatedData.user
      ? getStatusRedirect(
          '/auth/login',
          'Success!',
          'Please check your email for a confirmation link. You may now close this tab.'
        )
      : getStatusRedirect('/dashboard', 'Success!', 'You are now signed in.')
  } else {
    const { error, data } = await supabase.auth.signInWithOtp({
      email: email
    })

    if (error) {
      return getErrorRedirect('/auth/login', 'Sign in failed.', error.message)
    }

    return data.user
      ? getStatusRedirect(
          '/auth/login',
          'Success!',
          'Please check your email for a confirmation link. You may now close this tab.'
        )
      : getStatusRedirect('/dashboard', 'Success!', 'You are now signed in.')
  }
}

export async function anonymousSignin(formData: FormData) {
  const first_name = String(formData['first_name']).trim()
  const last_name = String(formData['last_name']).trim()
  const city = String(formData['city']).trim()
  const state = String(formData['state']).trim()

  const supabase = await createClient()
  const user = await getUser(supabase)

  // Only create a new account when the user is not signed in
  if (!user) {
    const { error } = await supabase.auth.signInAnonymously({
      options: { data: { full_name: `${first_name} ${last_name}` } }
    })

    if (error) {
      return getErrorRedirect('/scan/address', 'Error', error.message)
    }
  }

  // Create profile for the user
  const { data: profile, error: profileError } = await createProfile(supabase, {
    first_name,
    last_name,
    city,
    state
  })

  if (profileError) {
    return getErrorRedirect(
      '/scan/address',
      'Internal server error. Please try again later.',
      profileError.message
    )
  }

  return getStatusRedirect(
    '/scan/result',
    'Success!',
    'Your scan has been initiated.',
    false,
    `profile=${profile.id}`
  )
}
