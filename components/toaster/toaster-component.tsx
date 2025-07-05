'use client'
import { Toaster } from 'react-hot-toast'

export function ClientToaster({ locale }: { locale: string }) {
  return <Toaster position={locale === 'ar' ? 'top-left' : 'top-right'} />
}
