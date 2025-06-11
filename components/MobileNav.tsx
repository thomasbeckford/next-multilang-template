'use client'

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import { useState } from 'react'

export default function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden p-2 order-2 md:order-1">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right" className="md:hidden">
        <SheetTitle>Menu</SheetTitle>
        <nav className="flex flex-col space-y-4 mt-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium ${
                pathname === link.href ? 'text-primary' : ''
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
