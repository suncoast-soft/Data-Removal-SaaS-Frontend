export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const getURL = (path: string = '') => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          'http://localhost:3000/'

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, '')
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, '')

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url
}

export const toDateTime = (secs: number) => {
  const t = new Date(+0) // Unix epoch start.
  t.setSeconds(secs)
  return t
}

export const calculateTrialEndUnixTimestamp = (
  trialPeriodDays: number | null | undefined
) => {
  // Check if trialPeriodDays is null, undefined, or less than 2 days
  if (
    trialPeriodDays === null ||
    trialPeriodDays === undefined ||
    trialPeriodDays < 2
  ) {
    return undefined
  }

  const currentDate = new Date() // Current date and time
  const trialEnd = new Date(
    currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000
  ) // Add trial days
  return Math.floor(trialEnd.getTime() / 1000) // Convert to Unix timestamp in seconds
}

const toastKeyMap: { [key: string]: string[] } = {
  status: ['status', 'status_description'],
  error: ['error', 'error_description']
}

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType]

  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(toastDescription)}`
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`
  }

  return redirectPath
}

export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'status',
    statusName,
    statusDescription,
    disableButton,
    arbitraryParams
  )

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'error',
    errorName,
    errorDescription,
    disableButton,
    arbitraryParams
  )

export async function streamToString(
  stream: ReadableStream<Uint8Array>
): Promise<string> {
  const reader = stream.getReader()
  const decoder = new TextDecoder('utf-8')
  let result = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) {
      break
    }
    result += decoder.decode(value)
  }

  reader.releaseLock()
  return result
}

export const slugToTitle = (slug: string): string => {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const getInitials = (nameOrEmail: string): string => {
  if (!nameOrEmail) return ''

  const nameParts = nameOrEmail.split(' ')

  if (nameParts.length === 1) {
    const emailName = nameParts[0].split('@')[0]
    return emailName.charAt(0).toUpperCase()
  }

  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
  return initials
}

export const getAgeFromBirth = (birthDate: string): number => {
  const today = new Date()
  const birth = new Date(birthDate)

  let age = today.getFullYear() - birth.getFullYear()
  const monthDifference = today.getMonth() - birth.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    age--
  }

  return age
}

export const isRemovalActive = (pricing: {
  created_at: string
  type: 'one_year' | 'two_year' | 'annual_recurring' | null
}) => {
  const now = new Date()
  const createdAt = new Date(pricing.created_at)
  let expirationDate

  switch (pricing.type) {
    case 'one_year':
      expirationDate = new Date(createdAt)
      expirationDate.setFullYear(expirationDate.getFullYear() + 1)
      break
    case 'two_year':
      expirationDate = new Date(createdAt)
      expirationDate.setFullYear(expirationDate.getFullYear() + 2)
      break
    case 'annual_recurring':
      return true
    default:
      throw new Error(`Unknown membership type: ${pricing.type}`)
  }

  return now < expirationDate
}

export function splitName(fullName?: string): {
  firstName: string
  lastName: string
} {
  if (!fullName) {
    return {
      firstName: '',
      lastName: ''
    }
  }

  const nameParts = fullName.trim().split(/\s+/)

  if (nameParts.length === 1) {
    return {
      firstName: nameParts[0],
      lastName: ''
    }
  }

  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  return {
    firstName,
    lastName
  }
}

export const isValidEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return regex.test(email)
}

export const isValidPhone = (phone: string) => {
  const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  return regex.test(phone)
}

export const isValidUrl = (str: string) =>
  /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i.test(str)

export const getStateCode = (stateName: string): string => {
  const stateMapping = {
    Alabama: 'AL',
    Alaska: 'AK',
    Arizona: 'AZ',
    Arkansas: 'AR',
    California: 'CA',
    Colorado: 'CO',
    Connecticut: 'CT',
    Delaware: 'DE',
    Florida: 'FL',
    Georgia: 'GA',
    Hawaii: 'HI',
    Idaho: 'ID',
    Illinois: 'IL',
    Indiana: 'IN',
    Iowa: 'IA',
    Kansas: 'KS',
    Kentucky: 'KY',
    Louisiana: 'LA',
    Maine: 'ME',
    Maryland: 'MD',
    Massachusetts: 'MA',
    Michigan: 'MI',
    Minnesota: 'MN',
    Mississippi: 'MS',
    Missouri: 'MO',
    Montana: 'MT',
    Nebraska: 'NE',
    Nevada: 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    Ohio: 'OH',
    Oklahoma: 'OK',
    Oregon: 'OR',
    Pennsylvania: 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    Tennessee: 'TN',
    Texas: 'TX',
    Utah: 'UT',
    Vermont: 'VT',
    Virginia: 'VA',
    Washington: 'WA',
    'West Virginia': 'WV',
    Wisconsin: 'WI',
    Wyoming: 'WY'
  }

  return (
    stateMapping[stateName as keyof typeof stateMapping] || 'Invalid state name'
  )
}
