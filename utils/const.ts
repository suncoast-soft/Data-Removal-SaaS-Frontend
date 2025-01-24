const COLORS: Record<string, string> = {
  GREEN: '#97D700',
  BLUE: '#3B82F6',
  CORAL: '#FF7F66',
  BLACK: '#1F2937'
}

export const resultsRemovedData = [
  { name: 'Green Achieved', value: 25, color: COLORS.GREEN },
  { name: 'Blue Achieved', value: 25, color: COLORS.BLUE },
  { name: 'Remaining 1', value: 25, color: COLORS.CORAL },
  { name: 'Remaining 2', value: 25, color: COLORS.BLACK }
]

export const resultsRemovedLegend = [
  { name: 'Achieved', color: COLORS.GREEN },
  { name: 'Remaining', color: COLORS.CORAL },
  { name: 'Achieved', color: COLORS.BLUE },
  { name: 'Remaining', color: COLORS.BLACK }
]

export const resultTypesData = [
  { name: 'Social Media', value: 35, color: COLORS.GREEN },
  { name: 'Achieved', value: 35, color: COLORS.BLUE },
  { name: 'Addresses', value: 10, color: COLORS.CORAL },
  { name: 'Remaining', value: 20, color: COLORS.BLACK }
]

export const resultTypesLegend = [
  { name: 'Social Media', color: COLORS.GREEN },
  { name: 'Addresses', color: COLORS.CORAL },
  { name: 'Achieved', color: COLORS.BLUE },
  { name: 'Remaining', color: COLORS.BLACK }
]

export const digitalFootprintData = [
  { name: 'Achieved 1', value: 30, color: COLORS.GREEN },
  { name: 'Achieved 2', value: 25, color: COLORS.BLUE },
  { name: 'Remaining 1', value: 25, color: COLORS.CORAL },
  { name: 'Remaining 2', value: 20, color: COLORS.BLACK }
]

export const digitalFootprintLegend = [
  { name: 'Achieved', color: COLORS.GREEN },
  { name: 'Remaining', color: COLORS.CORAL },
  { name: 'Achieved', color: COLORS.BLUE },
  { name: 'Remaining', color: COLORS.BLACK }
]

export const tags = [
  'first name',
  'last name',
  'phone number',
  'address',
  'city',
  'state',
  'postal code',
  'country',
  'email',
  'birth',
  'gender',
  'family',
  'ssn',
  'employer',
  'google',
  'broker',
  'bing',
  'yahoo',
  'duckduckgo',
  'search',
  'data removal'
]

// export const tags = Array(15).fill({ label: 'phone number' })

// export const proTags = tags.map((tag, index) => ({
//   ...tag,
//   variant: index % 2 === 0 ? 'secondary' : 'outline'
// }))

// export const freeCategories = [
//   { count: '300', title: 'sites searched', isFill: true },
//   { count: '137', title: 'sites found', isFill: true },
//   { count: '0/100', title: 'search results removed' },
//   { count: '0/100', title: 'broker reports removed' }
// ]

// export const proCategories = [
//   { count: '40/100', title: 'search engine results removed' },
//   { count: '3/7', title: 'data broker results removed' }
// ]

// // Tab Definitions
// export const tabs = [
//   { value: 'google', name: 'Google', count: 200 },
//   { value: 'bing', name: 'Bing', count: 32 },
//   { value: 'duckduckgo', name: 'Duck Duck Go', count: 18 },
//   { value: 'yahoo', name: 'Yahoo', count: 11 },
//   { value: 'brokers', name: 'Data Brokers', count: 37 }
// ]

// export const paidTabs = [
//   { value: 'queue', name: 'In Queue', count: 135 },
//   { value: 'in_progress', name: 'In Progress', count: 3 },
//   { value: 'erased', name: 'Successfully Erased', count: 1 },
//   { value: 'action_required', name: 'Your Action Required' },
//   { value: 'unable_to_remove', name: 'Unable to Remove' }
// ]

// export const brokersResult = [
//   {
//     name: 'Joe Smith',
//     url: 'www.whitepages.com',
//     data: ['Mary Johnson', 'Boston']
//   },
//   {
//     name: 'Joe Smith',
//     url: 'www.otherpages.com',
//     data: ['45 years old', 'Chicago', '123 North Street'],
//     phone: '(123) 454-6543'
//   },
//   {
//     name: 'Joe Smith',
//     url: 'www.otherpages.com',
//     data: ['Mary Smith', 'Bob Johnson', 'Mary Johnson'],
//     phone: '(333) 454-8541'
//   }
// ]

// export const googleResults = Array(4).fill({
//   name: 'Congratulations Joe | Scouts BSA Troops 279...',
//   url: 'www.website.org',
//   subUrl: 'https://www.scouttroop279.org/2024/11/07/',
//   date: 'Nov 7, 2024 ... Tonight November 7th 2024'
// })
