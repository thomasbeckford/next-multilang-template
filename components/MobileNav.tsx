'use client'

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
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
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger className="md:hidden rounded-md hover:bg-muted p-2 order-2 md:order-1">
        <MenuIcon className="w-6 h-6" />
      </DrawerTrigger>

      <DrawerContent className="md:hidden flex flex-col justify-between py-8 px-6 bg-background text-foreground">
        <div>
          <DrawerTitle className="text-2xl font-bold mb-6">Menú</DrawerTitle>
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <DrawerClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={`text-lg px-3 py-2 rounded-md transition-colors duration-200 ${
                    pathname === link.href
                      ? 'bg-muted text-primary font-semibold'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              </DrawerClose>
            ))}
          </nav>
        </div>

        <div className="text-sm text-muted-foreground mt-10 text-center">
          © {new Date().getFullYear()} AwaitCode
        </div>
      </DrawerContent>
    </Drawer>
  )
}
