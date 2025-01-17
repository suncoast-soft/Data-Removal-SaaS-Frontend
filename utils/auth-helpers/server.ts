'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getURL, getErrorRedirect, getStatusRedirect } from 'utils/helpers'
import { getAuthTypes } from 'utils/auth-helpers/settings'

function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return regex.test(email)
}
function isValidPhone(phone: string) {
  var regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  return regex.test(phone)
}

export async function redirectToPath(path: string) {
  return redirect(path)
}

export async function SignOut(formData: {
  [key: string]: string | number | boolean
}) {
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

export async function signInWithEmail(formData: {
  [key: string]: string | number | boolean
}) {
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
  let options = {
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

export async function signInWithPhone(formData: {
  [key: string]: string | number | boolean
}) {
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
  let options = {
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

export async function verifyOTP(formData: {
  [key: string]: string | number | boolean
}) {
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

export async function requestPasswordUpdate(formData: {
  [key: string]: string | number | boolean
}) {
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

export async function signInWithPassword(formData: {
  [key: string]: string | number | boolean
}) {
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
    const isDeleted = await accountDeleted(data.user.id)
    if (isDeleted) {
      await supabase.auth.signOut()
      redirectPath = getErrorRedirect(
        '/signin',
        'Hmm... Something went wrong.',
        'You could not be signed in. Please contact support'
      )
    } else {
      cookieStore.set('preferredSignInView', 'password_signin', { path: '/' })
      redirectPath = getStatusRedirect(
        '/',
        'Success!',
        'You are now signed in.'
      )
    }
  } else {
    redirectPath = getErrorRedirect(
      '/signin/password_signin',
      'Hmm... Something went wrong.',
      'You could not be signed in.'
    )
  }

  return redirectPath
}

export async function signUp(formData: {
  [key: string]: string | number | boolean
}) {
  const email = String(formData['email']).trim()
  const password = String(formData['password']).trim()
  const phone = String(formData['phone']).trim()

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

export async function updatePassword(formData: {
  [key: string]: string | number | boolean
}) {
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

export async function updateUserField(formData: {
  [key: string]: string | number | boolean
}) {
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

export async function updateName(formData: {
  [key: string]: string | number | boolean
}) {
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

export async function updateUser(formData: {
  [key: string]: string | number | boolean
}) {
  // Get form data
  const firstName = String(formData['firstName']).trim()
  const lastName = String(formData['lastName']).trim()
  const gender = String(formData['gender'])
  const birthDate = String(formData['birthDate']).trim()
  const city = String(formData['city']).trim()
  const state = String(formData['state']).trim()
  const bio = String(formData['bio']).trim()
  const address = String(formData['address']).trim()
  const alternativeNames = String(formData['alternativeNames']).trim()
  const social_security_number = String(
    formData['social_security_number']
  ).trim()
  const phone = String(formData['phone']).trim()
  const email = String(formData['email']).trim()
  const isPrimary = Boolean(formData['isPrimary'])

  const supabase = createClient()
  const {
    error: userError,
    data: { user }
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return getErrorRedirect(
      '/dashboard/settings/profiles',
      'Your profile could not be submitted. Please try again.',
      userError?.message || 'Could not get user session.'
    )
  }

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)

  const isFistProfile = (profiles || []).length < 1

  const { data, error: insertError } = await supabase
    .from('profiles')
    .insert({
      user_id: user?.id,
      first_name: firstName ?? undefined,
      last_name: lastName ?? undefined,
      gender: gender ?? undefined,
      birth_date: birthDate ?? undefined,
      city: city ?? undefined,
      state: state ?? undefined,
      bio: bio ?? undefined,
      address: address ?? undefined,
      alternative_names: alternativeNames ?? undefined,
      social_security_number: social_security_number ?? undefined,
      phone: phone ?? undefined,
      email: email ?? undefined,
      isPrimary: isFistProfile ? true : (Boolean(isPrimary) ?? undefined)
    })
    .select('id')
    .maybeSingle()

  if (!isFistProfile) {
    await supabase
      .from('profiles')
      .update({ isPrimary: false })
      .neq('id', data?.id)
      .select()
  }

  if (insertError) {
    return getErrorRedirect(
      '/dashboard/settings/account',
      'Your profile could not be submitted. Please try again.',
      insertError.message
    )
  }

  return getStatusRedirect(
    '/dashboard/settings/account',
    'Success!',
    'Your profile has been submitted.'
  )
}

export async function updateProfile(formData: {
  [key: string]: string | number | boolean
}) {
  // Get form data
  const id = String(formData['id']).trim()
  const firstName = String(formData['firstName']).trim()
  const lastName = String(formData['lastName']).trim()
  const gender = String(formData['gender'])
  const birthDate = String(formData['birthDate']).trim()
  const city = String(formData['city']).trim()
  const state = String(formData['state']).trim()
  const bio = String(formData['bio']).trim()
  const address = String(formData['address']).trim()
  const alternativeNames = String(formData['alternativeNames']).trim()
  const social_security_number = String(
    formData['social_security_number']
  ).trim()
  const phone = String(formData['phone']).trim()
  const email = String(formData['email']).trim()
  const isPrimary = String(formData['isPrimary']).trim()

  const supabase = createClient()
  const {
    error: userError,
    data: { user }
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return getErrorRedirect(
      '/dashboard/settings/account',
      'Your profile could not be updated. Please try again.',
      userError?.message || 'Could not get user session.'
    )
  }
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)

  const isFistProfile = (profiles || []).length < 1

  const { error: insertError } = await supabase
    .from('profiles')
    .update({
      first_name: firstName ?? undefined,
      last_name: lastName ?? undefined,
      gender: gender ?? undefined,
      birth_date: birthDate ?? undefined,
      city: city ?? undefined,
      state: state ?? undefined,
      bio: bio ?? undefined,
      address: address ?? undefined,
      alternative_names: alternativeNames ?? undefined,
      social_security_number: social_security_number ?? undefined,
      phone: phone ?? undefined,
      email: email ?? undefined,
      isPrimary: isFistProfile ? true : (Boolean(isPrimary) ?? undefined)
    })
    .eq('id', id)

  if (!isFistProfile) {
    await supabase
      .from('profiles')
      .update({ isPrimary: false })
      .neq('id', id)
      .select()
  }

  if (insertError) {
    return getErrorRedirect(
      '/dashboard/settings/account',
      'Your profile could not be updated. Please try again.',
      insertError.message
    )
  }

  return getStatusRedirect(
    '/dashboard/settings/account',
    'Success!',
    'Your profile has been updated.'
  )
}

export async function createUser(formData: {
  [key: string]: string | number | boolean
}) {
  // Get form data
  const firstName = String(formData['firstName']).trim()
  const lastName = String(formData['lastName']).trim()
  const birthDate = String(formData['birthDate']).trim()
  const email = String(formData['email']).trim()
  const address = String(formData['address']).trim()
  const phone = String(formData['phone']).trim()
  const bio = String(formData['bio']).trim()

  const supabase = createClient()

  const { error: insertError } = await supabase.from('profiles').insert({
    first_name: firstName ?? undefined,
    last_name: lastName ?? undefined,
    birth_date: birthDate ?? undefined,
    email: email ?? undefined,
    address: address ?? undefined,
    phone: phone ?? undefined,
    bio: bio ?? undefined
  })

  if (insertError) {
    return getErrorRedirect(
      '/signin/signup',
      'Your profile could not be submitted. Please try again.',
      insertError.message
    )
  }

  return getStatusRedirect('/', 'Success!', 'User signed up successfully')
}

export async function updateUserSettings(formData: {
  [key: string]: string | number | boolean | null
}) {
  // Get form data
  const id = String(formData['id']).trim()
  const receive_status_updates = String(
    formData['receive_status_updates']
  ).trim()
  const receive_marketing_emails = Boolean(formData['receive_marketing_emails'])
  const allow_multi_device_login = Boolean(formData['allow_multi_device_login'])
  const require_multi_factor_verification = Boolean(
    formData['require_multi_factor_verification']
  )
  const deleted = Boolean(formData['deleted'])

  const supabase = createClient()

  const { data, error: insertError } = await supabase
    .from('settings')
    .update({
      receive_status_updates: receive_status_updates ?? 'email',
      receive_marketing_emails: Boolean(receive_marketing_emails),
      allow_multi_device_login: Boolean(allow_multi_device_login),
      require_multi_factor_verification: Boolean(
        require_multi_factor_verification
      ),
      deleted: Boolean(deleted)
    })
    .eq('id', id)
    .select()

  if (insertError) {
    return getErrorRedirect(
      '/dashboard/settings/account',
      'Your settings could not be updated. Please try again.',
      insertError.message
    )
  }

  if (deleted) {
    await supabase.auth.signOut()
    return '/signin'
  }

  return getStatusRedirect(
    '/dashboard/settings/account',
    'Success!',
    'User settings updated successfully'
  )
}

const accountDeleted = async (id: string) => {
  const supabase = createClient()
  if (!id) return false
  const { data } = await supabase
    .from('settings')
    .select('*')
    .eq('user_id', id)
    .maybeSingle()
  return data?.deleted
}

export async function createUserSettings(formData: {
  [key: string]: string | number | boolean | null
}) {
  const user_id = String(formData['id']).trim()
  const supabase = createClient()
  const { data } = await supabase
    .from('settings')
    .select('*')
    .eq('user_id', user_id)
    .maybeSingle()
  if (data) {
    return
  }

  const { error } = await supabase.from('settings').insert({
    user_id,
    receive_status_updates: 'email',
    receive_marketing_emails: true,
    allow_multi_device_login: true,
    require_multi_factor_verification: false
  })

  console.log(error, 'error')
}
