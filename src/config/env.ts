import Constants from 'expo-constants'

const extra = Constants.expoConfig?.extra as Record<string, string | undefined> | undefined

function requireVar(key: string): string {
  const value = extra?.[key]
  if (!value) throw new Error(`[env] Missing required config var: "${key}"`)
  return value
}

export const env = {
  apiUrl: requireVar('apiUrl'),
}
