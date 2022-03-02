// Env
export const NODE_ENV = process.env.NODE_ENV ?? "development"
export const JWTSECRET = process.env.JWTSECRET ?? "no_secret"
export const MONGOURI = process.env.DATABASEURI ?? "no_uri"
export const SALT_OR_ROUNDS = process.env.SALT_OR_ROUNDS ?? 15
