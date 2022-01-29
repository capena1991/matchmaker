export const isDev = () => process.env.ENVIRONMENT === "dev"

export const db = process.env.DATABASE_URL

interface Config {
  token: string
  botUserId: string
}

export const getConfig = <T extends keyof Config>(key: T): Config[T] => {
  const val = process.env[key]
  return val && JSON.parse(val)
}

export const token = getConfig("token")
export const botUserId = getConfig("botUserId")
