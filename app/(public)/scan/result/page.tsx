import ScanResults from '@/components/sections/ScanResults'

export default async function ScanResultPage({
  searchParams
}: {
  searchParams: Promise<{
    profile: string
    is_new: string
  }>
}) {
  const { profile, is_new } = await searchParams

  return <ScanResults profile={profile} is_new={is_new} />
}
