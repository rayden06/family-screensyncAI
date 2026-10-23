import { redirect } from 'next/navigation'

// "/" is rewritten to /index.html in next.config.mjs; this is only a fallback.
export default function Page() {
  redirect('/index.html')
}
