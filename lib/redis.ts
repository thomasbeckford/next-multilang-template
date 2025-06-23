const isProd = process.env.NODE_ENV === 'production'

let redis: {
  get: <T = any>(key: string) => Promise<T | null>
  set: (key: string, value: any, options?: { ex?: number }) => Promise<void>
}

if (isProd) {
  console.log('Using Upstash Redis')
  // Producción con Upstash
  const { Redis } = require('@upstash/redis')
  const upstash = Redis.fromEnv()

  redis = {
    get: (key) => upstash.get(key),
    set: (key, value, options) =>
      upstash.set(key, value, options ?? { ex: 60 * 60 * 24 * 7 }),
  }
} else {
  console.log('Using local Redis')
  // Local con ioredis
  const IORedis = require('ioredis')
  const localRedis = new IORedis()

  redis = {
    get: async (key) => {
      const raw = await localRedis.get(key)
      return raw ? JSON.parse(raw) : null
    },
    set: async (key, value, options) => {
      await localRedis.set(
        key,
        JSON.stringify(value),
        ...(options?.ex ? ['EX', options.ex] : [])
      )
    },
  }
}

export default redis
