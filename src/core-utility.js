"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwIfUndefined(t, identity) {
    if (t)
        return t;
    const seed = typeof identity === 'string' ? identity : JSON.stringify(identity);
    throw new Error(`Expected existing record for primaryKey ${seed}, but none found.`);
}
exports.throwIfUndefined = throwIfUndefined;
//# sourceMappingURL=core-utility.js.map