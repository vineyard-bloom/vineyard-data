export type UUID = string

export type DbRecord<primaryKey extends string, KeyType> = { [p in primaryKey]: KeyType }
export type DbRecordQuerySeed<T extends DbRecord<primaryKey, any>, primaryKey extends string> = T | T[primaryKey]

// For querying, should be the object containing its primary key(s), or the primary key itself.
export type QuerySeed<T> = T | string | number
// Aux type, should rarely be used
export type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
// Returns T but with the KeysToRemove removed
export type Omit<T, KeysToRemove extends keyof T> = Pick<T, Diff<keyof T, KeysToRemove>>
// Same as omit but KeysToRemove needn't be keys of T, in which case nothing will happen
export type OmitIfPresent<T, KeysToRemove extends string> = Pick<T, Diff<keyof T, KeysToRemove>>

export type Expanded<T, ForeignKeyToExpand extends keyof T, ExpandAs> = Omit<T, ForeignKeyToExpand> & { [k in ForeignKeyToExpand]: ExpandAs }