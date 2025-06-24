import { Redis as UpstashRedis } from '@upstash/redis'
import IORedis from 'ioredis'

const isProd = process.env.NODE_ENV === 'production'

let redis: {
  get: <T = any>(key: string) => Promise<T | null>
  set: (key: string, value: any, options?: { ex?: number }) => Promise<void>
}

if (isProd) {
  console.log('Using Upstash Redis')
  const upstash = UpstashRedis.fromEnv()

  redis = {
    get: async <T = any>(key: string): Promise<T | null> => {
      return await upstash.get<T>(key)
    },
    set: async (key, value, options) => {
      if (options?.ex) {
        await upstash.set(key, value, { ex: options.ex })
      } else {
        await upstash.set(key, value)
      }
    },
  }
} else {
  console.log('Using local Redis')
  const localRedis = new IORedis()

  redis = {
    get: async <T = any>(key: string): Promise<T | null> => {
      const raw = await localRedis.get(key)
      return raw ? (JSON.parse(raw) as T) : null
    },
    set: async (key, value, options) => {
      const args: (string | number)[] = [key, JSON.stringify(value)]
      if (options?.ex) {
        args.push('EX', options.ex)
      }
      await localRedis.set(...(args as [string, string, ...any[]]))
    },
  }
}

export default redis
