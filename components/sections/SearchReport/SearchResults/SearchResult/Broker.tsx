import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const renderValue = (value: any): string | React.ReactNode => {
  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      // Render arrays as a comma-separated list
      return value.map(renderValue).join(', ')
    }
    // Render nested objects as key-value pairs
    return (
      <ul className="pl-4 list-none">
        {Object.entries(value)
          .filter(([, nestedValue]) => nestedValue !== null) // Skip null values
          .map(([nestedKey, nestedValue]) => (
            <li key={nestedKey}>
              <strong>{nestedKey}:</strong> {renderValue(nestedValue)}
            </li>
          ))}
      </ul>
    )
  }
  // Render primitives
  return String(value)
}

export default function BrokerSearchResults({ searches }: { searches: any[] }) {
  return (
    <div className="space-y-6">
      {searches.map((search, index) => (
        <Card key={index} className="border border-gray-200">
          <CardHeader>
            <CardTitle>{search.broker?.name ?? 'Unknown Broker'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableBody>
                {Object.entries(flattenData(search.result ?? {}))
                  .filter(([, value]) => value !== null) // Skip null values
                  .map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{key}</TableCell>
                      <TableCell>{renderValue(value)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Helper to flatten nested objects and skip first-level names
function flattenData(data: object): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(data)) {
    if (value === null) continue // Skip null values
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Flatten nested objects but ignore the top-level key
      Object.assign(result, flattenData(value))
    } else if (Array.isArray(value)) {
      // For arrays, include directly
      value.forEach((item) => {
        if (typeof item === 'object') {
          Object.assign(result, flattenData(item))
        } else {
          result[key] = value
        }
      })
    } else {
      // Add primitive values directly
      result[key] = value
    }
  }

  return result
}
