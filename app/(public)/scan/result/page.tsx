import ScanResults from '@/components/sections/ScanResults'

export default async function ScanResultPage({
  searchParams
}: {
  searchParams: Promise<{ name: string; city: string; state: string }>
}) {
  const { name, city, state } = await searchParams

  return <ScanResults name={name} city={city} state={state} />
}
