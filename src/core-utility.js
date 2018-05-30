"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This function will convert a query which may or may not return a record into one which throws and error if
// the record is not found.
/*
  pizzaCollection.get(pizzaId).then(throwIfUndefined)

  or for a more descriptive error message...

  pizzaCollection.get(pizzaId).then(possiblePizza => throwIfUndefined(possiblePizza, pizzaId))
*/
function throwIfUndefined(t, identity) {
    if (t)
        return t;
    if (!identity)
        throw new Error(`Expected existing record but none found.`);
    const seed = typeof identity === 'string' ? identity : JSON.stringify(identity);
    throw new Error(`Expected existing record for primaryKey ${seed}, but none found.`);
}
exports.throwIfUndefined = throwIfUndefined;
//# sourceMappingURL=core-utility.js.map