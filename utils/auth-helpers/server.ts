'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

import {
  getURL,
  getErrorRedirect,
  getStatusRedirect,
  isValidEmail,
  isValidPhone
} from 'utils/helpers'
import { getAuthTypes } from 'utils/auth-helpers/settings'
import { redirect } from 'next/navigation'

interface FormData {
  [key: string]: string | number | boolean
}

export async function redirectToPath(path: string) {
  return redirect(path)
}

export async function SignOut(formData: FormData) {
  const pathName = String(formData['pathName']).trim()

  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return getErrorRedirect(
      pathName,
      'Hmm... Something went wrong.',
      'You could not be signed out.'
    )
  }

  return '/signin'
}

export async function signInWithEmail(formData: FormData) {
  const cookieStore = cookies()
  const callbackURL = getURL('/auth/callback')

  const email = String(formData['email']).trim()
  let redirectPath: string

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'Invalid email address.',
      'Please try again.'
    )
  }

  const supabase = createClient()
  const options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true
  }

  // If allowPassword is false, do not create a new user
  const { allowPassword } = getAuthTypes()
  if (allowPassword) options.shouldCreateUser = false
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: options
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'You could not be signed in.',
      error.message
    )
  } else if (data) {
    cookieStore.set('preferredSignInView', 'email_signin', { path: '/' })
    redirectPath = getStatusRedirect(
      '/signin/email_signin',
      'Success!',
      'Please check your email for a magic link. You may now close this tab.',
      true
    )
  } else {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'Hmm... Something went wrong.',
      'You could not be signed in.'
    )
  }

  return redirectPath
}

export async function signInWithPhone(formData: FormData) {
  const cookieStore = cookies()
  const callbackURL = getURL('/auth/callback')

  const phone = String(formData['phone']).trim()
  let redirectPath: string

  if (!isValidPhone(phone)) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Invalid phone number.',
      'Please try again.'
    )
  }

  const supabase = createClient()
  const options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true
  }

  // If allowPassword is false, do not create a new user
  const { allowPassword } = getAuthTypes()
  if (allowPassword) options.shouldCreateUser = false
  const { data, error } = await supabase.auth.signInWithOtp({
    phone,
    options: options
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'You could not be signed in.',
      error.message
    )
  } else if (data) {
    cookieStore.set('preferredSignInView', 'verify/otp', { path: '/' })
    redirectPath = getStatusRedirect(
      '/verify/otp',
      'Success!',
      'Please check your phone for an OTP code.',
      true
    )
  } else {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Hmm... Something went wrong.',
      'You could not be signed in.'
    )
  }

  return redirectPath
}

export async function verifyOTP(formData: FormData) {
  const phone = String(formData['phone']).trim()
  const otp = String(formData['otp']).trim()
  let redirectPath: string

  if (!isValidPhone(phone)) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Invalid phone number.',
      'Please try again.'
    )
  }

  const supabase = createClient()

  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token: otp,
    type: 'sms'
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Sign up failed.',
      error.message
    )
  } else if (data.session) {
    redirectPath = getStatusRedirect(
      '/',
      'Success!',
      'Verified! You are now signed in.'
    )
  } else if (
    data.user &&
    data.user.identities &&
    data.user.identities.length == 0
  ) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Sign up failed.',
      'There is already an account associated with this email address. Try resetting your password.'
    )
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      '/',
      'Success!',
      'Please check your email for a confirmation link. You may now close this tab.'
    )
  } else {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Hmm... Something went wrong.',
      'You could not be signed up.'
    )
  }

  return redirectPath
}

export async function requestPasswordUpdate(formData: FormData) {
  const callbackURL = getURL('/auth/reset_password')

  // Get form data
  const email = String(formData['email']).trim()
  let redirectPath: string

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      'Invalid email address.',
      'Please try again.'
    )
  }

  const supabase = createClient()

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackURL
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      error.message,
      'Please try again.'
    )
  } else if (data) {
    redirectPath = getStatusRedirect(
      '/signin/forgot_password',
      'Success!',
      'Please check your email for a password reset link. You may now close this tab.',
      true
    )
  } else {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      'Hmm... Something went wrong.',
      'Password reset email could not be sent.'
    )
  }

  return redirectPath
}

export async function signInWithPassword(formData: FormData) {
  const cookieStore = cookies()
  const email = String(formData['email']).trim()
  const password = String(formData['password']).trim()
  let redirectPath: string

  const supabase = createClient()
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/password_signin',
      'Sign in failed.',
      error.message
    )
  } else if (data.user) {
    cookieStore.set('preferredSignInView', 'password_signin', { path: '/' })
    redirectPath = getStatusRedirect('/', 'Success!', 'You are now signed in.')
  } else {
    redirectPath = getErrorRedirect(
      '/signin/password_signin',
      'Hmm... Something went wrong.',
      'You could not be signed in.'
    )
  }

  return redirectPath
}

export async function signUp(formData: FormData) {
  const email = String(formData['email']).trim()
  const phone = String(formData['phone']).trim()
  const password = String(formData['password']).trim()

  const callbackURL = getURL('/auth/callback')

  let redirectPath: string

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Invalid email address.',
      'Please try again.'
    )
  }

  const supabase = createClient()
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      emailRedirectTo: callbackURL
    }
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Sign up failed.',
      error.message
    )
  } else if (data.session) {
    redirectPath = getStatusRedirect('/', 'Success!', 'You are now signed in.')
  } else if (
    data.user &&
    data.user.identities &&
    data.user.identities.length == 0
  ) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Sign up failed.',
      'There is already an account associated with this email address. Try resetting your password.'
    )
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      '/',
      'Success!',
      'Please check your email for a confirmation link. You may now close this tab.'
    )
  } else {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Hmm... Something went wrong.',
      'You could not be signed up.'
    )
  }

  return redirectPath
}

export async function updatePassword(formData: FormData) {
  const password = String(formData['password']).trim()
  const passwordConfirm = String(formData['passwordConfirm']).trim()
  let redirectPath: string

  // Check that the password and confirmation match
  if (password !== passwordConfirm) {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Your password could not be updated.',
      'Passwords do not match.'
    )
  }

  const supabase = createClient()
  const { error, data } = await supabase.auth.updateUser({
    password
  })

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Your password could not be updated.',
      error.message
    )
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      '/',
      'Success!',
      'Your password has been updated.'
    )
  } else {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Hmm... Something went wrong.',
      'Your password could not be updated.'
    )
  }

  return redirectPath
}

export async function updateUserField(formData: FormData) {
  // Get form data
  const value = String(formData['value']).trim()
  const field = String(formData['field']).trim()

  // Check that the email is valid
  if (formData.field === 'email' && !isValidEmail(value)) {
    return getErrorRedirect(
      '/dashboard/settings/account',
      'Your email could not be updated.',
      'Invalid email address.'
    )
  }

  const supabase = createClient()

  const callbackUrl = getURL(
    getStatusRedirect(
      '/dashboard/settings/account',
      'Success!',
      `Your ${field} has been updated.`
    )
  )

  const { error } = await supabase.auth.updateUser(
    { [field]: value },
    field === 'email'
      ? {
          emailRedirectTo: callbackUrl
        }
      : {}
  )

  if (error) {
    return getErrorRedirect(
      '/dashboard/settings/account',
      `Your ${field} could not be updated.`,
      error.message
    )
  } else {
    if (field === 'email')
      return getStatusRedirect(
        '/dashboard/settings/account',
        'Confirmation emails sent.',
        `You will need to confirm the update by clicking the links sent to both the old and new email addresses.`
      )
    return getStatusRedirect(
      '/dashboard/settings/account',
      'Success!',
      `Your ${field} has been updated.`
    )
  }
}

export async function updateName(formData: FormData) {
  // Get form data
  const fullName = String(formData['fullName']).trim()

  const supabase = createClient()
  const { error, data } = await supabase.auth.updateUser({
    data: { full_name: fullName }
  })

  if (error) {
    return getErrorRedirect(
      '/dashboard/settings/account',
      'Your name could not be updated.',
      error.message
    )
  } else if (data.user) {
    return getStatusRedirect(
      '/dashboard/settings/account',
      'Success!',
      'Your name has been updated.'
    )
  } else {
    return getErrorRedirect(
      '/dashboard/settings/account',
      'Hmm... Something went wrong.',
      'Your name could not be updated.'
    )
  }
}
