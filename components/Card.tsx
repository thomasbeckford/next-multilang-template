import React from 'react'
import { Container } from './ui/container'

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <Container
      variant="breakpointPadded"
      className="animate-in fade-in bg-secondary text-secondary-foreground py-12"
    >
      {children}
    </Container>
  )
}
