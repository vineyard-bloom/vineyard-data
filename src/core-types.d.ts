export declare type UUID = string;
export declare type DbRecord<primaryKey extends string, KeyType> = {
    [p in primaryKey]: KeyType;
};
export declare type DbRecordQuerySeed<T extends DbRecord<primaryKey, any>, primaryKey extends string> = T | T[primaryKey];
export declare type QuerySeed<T> = T | string | number;
export declare type Diff<T extends string, U extends string> = ({
    [P in T]: P;
} & {
    [P in U]: never;
} & {
    [x: string]: never;
})[T];
export declare type Omit<T, KeysToRemove extends keyof T> = Pick<T, Diff<keyof T, KeysToRemove>>;
export declare type OmitIfPresent<T, KeysToRemove extends string> = Pick<T, Diff<keyof T, KeysToRemove>>;
export declare type Expanded<T, ForeignKeyToExpand extends keyof T, ExpandAs> = Omit<T, ForeignKeyToExpand> & {
    [k in ForeignKeyToExpand]: ExpandAs;
};
