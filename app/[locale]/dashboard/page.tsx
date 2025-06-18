import { auth } from '@clerk/nextjs/server'
import { Container } from '@/components/ui/container'

export default async function DashboardPage() {
  const { userId } = await auth()

  return (
    <Container>
      <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
      <p className="text-muted-foreground">User ID: {userId}</p>
    </Container>
  )
}
