import { supabase } from '@/lib/supabase'
import GDVDetail from '@/components/GDVDetail'
import { notFound } from 'next/navigation'

export default async function GDVDetailPage({ params }: { params: { id: string } }) {
  const { data: gdv, error } = await supabase
    .from('gdv')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !gdv) {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <GDVDetail gdv={gdv} />
    </div>
  )
}
