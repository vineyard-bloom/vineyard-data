import { QuerySeed } from "./core-types"

export function throwIfUndefined<T> (t: T | undefined, identity: QuerySeed<T>): T {
  if (t) return t as T
  const seed = typeof identity === 'string'? identity : JSON.stringify(identity)
  throw new Error(`Expected existing record for primaryKey ${seed}, but none found.`)
}
