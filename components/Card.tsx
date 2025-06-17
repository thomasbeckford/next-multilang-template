import React from 'react'
import { Container } from './ui/container'
import {
  CursorProvider,
  Cursor,
  CursorFollow,
} from '@/components/animate-ui/components/cursor'

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <Container
      variant="breakpointPadded"
      className="animate-in fade-in bg-secondary text-secondary-foreground py-12"
    >
      <CursorProvider>
        {children}
        <Cursor>
          <svg
            className="size-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
          >
            <path
              fill="currentColor"
              d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
            />
          </svg>
        </Cursor>
        <CursorFollow>
          <div className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm shadow-lg">
            Thomas
          </div>
        </CursorFollow>
      </CursorProvider>
    </Container>
  )
}
