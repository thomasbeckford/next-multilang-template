'use client'

import { Link } from '@/i18n/navigation'
import useLinks from '@/hooks/useLinks'

export default function Navbar() {
  const links = useLinks()

  return (
    <header className="hidden md:flex items-center justify-between px-6 py-4 border-b bg-background">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold">
          Logo
        </Link>

        <nav className="flex items-center gap-6">
          {links.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
