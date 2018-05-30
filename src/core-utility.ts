import { QuerySeed } from "./core-types"

// This function will convert a query which may or may not return a record into one which throws and error if
// the record is not found.

/*
  pizzaCollection.get(pizzaId).then(throwIfUndefined)

  or for a more descriptive error message...

  pizzaCollection.get(pizzaId).then(possiblePizza => throwIfUndefined(possiblePizza, pizzaId))
*/
export function throwIfUndefined<T> (t: T | undefined, identity?: QuerySeed<T>): T {
  if (t) return t as T
  if(!identity) throw new Error(`Expected existing record but none found.`)

  const seed = typeof identity === 'string'? identity : JSON.stringify(identity)
  throw new Error(`Expected existing record for primaryKey ${seed}, but none found.`)
}
