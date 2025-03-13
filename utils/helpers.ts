import { format, parseISO } from 'date-fns'

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

export const getURL = (path: string = '') => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : 'http://localhost:3000/'

  url = url.replace(/\/+$/, '')
  url = url.includes('http') ? url : `https://${url}`
  path = path.replace(/^\/+/, '')

  return path ? `${url}/${path}` : url
}

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
): string => {
  const toastKeyMap: { [key: string]: string[] } = {
    status: ['status', 'status_description'],
    error: ['error', 'error_description']
  }

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

export const isPremiumUser = (pricing: { created_at: string }) => {
  const now = new Date()
  const createdAt = new Date(pricing.created_at)

  const expirationDate = new Date(createdAt)
  expirationDate.setFullYear(expirationDate.getFullYear() + 1)

  return now < expirationDate
}

export function splitName(fullName: string = ''): {
  firstName: string
  lastName: string
} {
  const [firstName = '', ...rest] = fullName.trim().split(/\s+/)
  const lastName = rest.join(' ')

  return { firstName, lastName }
}

export function splitAddress(address: string = ''): {
  city: string
  state: string
} {
  const [city = '', state = ''] = address.split(',').map((part) => part.trim())

  return { city, state }
}

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

  return stateMapping[stateName as keyof typeof stateMapping] || ''
}

export const hasKeyInData = (
  data: any,
  keysToCheck: string | null,
  exclude: string[] = []
): boolean => {
  if (!data || typeof data !== 'object') return false

  let secondLevelData

  if (!Array.isArray(data.results)) {
    secondLevelData = data
  } else {
    secondLevelData = data.results
  }

  const keysToCheckFormatted = keysToCheck
    ? keysToCheck.trim().toLowerCase()
    : null
  const excludeFormatted = exclude.map((ex) => ex.trim().toLowerCase())

  const checkKeyExistsWithValue = (obj: any) => {
    return Object.keys(obj).some((key) => {
      const keyFormatted = key.trim().toLowerCase()
      const value = obj[key]

      const hasValidValue =
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'string' && value.trim() === '')

      return (
        (keysToCheckFormatted === keyFormatted ||
          (keysToCheckFormatted === null &&
            !excludeFormatted.includes(keyFormatted))) &&
        hasValidValue
      )
    })
  }

  if (!Array.isArray(secondLevelData)) {
    return checkKeyExistsWithValue(secondLevelData)
  }

  return secondLevelData.some((item) => checkKeyExistsWithValue(item))
}

export const getKeysInData = (data: unknown): string[] => {
  interface DataObject {
    [key: string]: any
  }

  if (!data || typeof data !== 'object' || data === null) return []

  let secondLevelData: DataObject

  if (!Array.isArray((data as Record<string, any>).results)) {
    secondLevelData = data as DataObject
  } else {
    secondLevelData = (
      (data as Record<string, any>).results as Array<DataObject>
    ).reduce((acc: DataObject, obj: DataObject) => {
      return { ...acc, ...obj }
    }, {})
  }

  return Object.keys(secondLevelData).filter((key) => {
    const value = secondLevelData[key]
    return (
      value !== null &&
      value !== undefined &&
      !(Array.isArray(value) && value.length === 0) &&
      !(typeof value === 'string' && value.trim() === '')
    )
  })
}

export const assembleAddress = (profile: Record<string, any>): string => {
  const { address, city, state, zip, country } = profile
  return [address, city, state, zip, country].filter((part) => part).join(', ')
}

export const displayDate = (
  dateValue: string | Date | number | null,
  pattern?: string
): string => {
  if (!dateValue) return ''

  try {
    let date: Date
    if (typeof dateValue === 'string') {
      date = parseISO(dateValue)
    } else if (typeof dateValue === 'number') {
      date = new Date(dateValue)
    } else {
      date = dateValue
    }

    return format(date, pattern ?? 'MM/dd/yyyy')
  } catch {
    return ''
  }
}

export const formatPrice = (price: number) => {
  const formattedPrice = price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return `$${formattedPrice}`
}
