'use client'

import { Container } from './ui/container'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="justify-end w-full h-32 bg-primary text-primary-foreground content-center">
      <Container>
        <div className="text-center flex flex-col gap-2 ">
          <div className="flex gap-2 justify-center">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-ofLservice">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>

          <p>© {new Date().getFullYear()} Next.js Multilingual Boilerplate</p>
        </div>
      </Container>
    </div>
  )
}
