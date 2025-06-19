'use client'

import { Link } from '@/i18n/navigation'
import useLinks from '@/hooks/useLinks'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'

export default function Navbar() {
  const links = useLinks()

  return (
    <header className="hidden md:flex items-center justify-between border-b bg-transparent">
      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-6">
          {links.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  )
}
