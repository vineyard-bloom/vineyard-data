import { Omit, QuerySeed } from "./core-types"
import { Collection, CollectionTrellis, Operation, QueryBuilder } from "../legacy/index"

export type CreateSeed<T, DbPopulatedFields extends keyof T, ForeignKeyArrayFields extends keyof T> =
  { [ p in DbPopulatedFields ]?: T[p] } &
  { [ k in ForeignKeyArrayFields]?: Operation[] } &
  Omit<T, ForeignKeyArrayFields | DbPopulatedFields>

export type UpdateSeed<T, ForeignKeyArrayFields extends keyof T> =
  { [ k in ForeignKeyArrayFields]?: Operation[] } &
  Partial<Omit<T, ForeignKeyArrayFields>>

export interface StrictCollection<T, DbPopulatedFields extends keyof T = NoKeys, ForeignKeyArrayFields extends keyof T = NoKeys>{
  getTrellis(): CollectionTrellis<T>

  getTableClient(): void

  create(seed: CreateSeed<T, DbPopulatedFields, ForeignKeyArrayFields>): Promise<T>

  create_or_update(seed: UpdateSeed<T, ForeignKeyArrayFields>): Promise<T>

  update(seed: QuerySeed<T>, changes: UpdateSeed<T, ForeignKeyArrayFields>): Promise<T>

  remove(seed: QuerySeed<T>): Promise<T>

  all(): QueryBuilder<T, T[]>

  filter(options: Partial<T>): QueryBuilder<T, T[]>

  first(options?: Partial<T>): QueryBuilder<T, T | undefined>

  get(identity: QuerySeed<T>): Promise<T>
}

export type NoKeys = never