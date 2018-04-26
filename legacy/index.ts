export interface SequelizeModel {
  create: any
  update: any
  upsert: any
  remove: any
}

export interface Table {
  name: string
  isCross?: boolean
}

export interface SequelizeTable extends Table {
  sequelize: any

  getTableName(): string

  belongsToMany(table: Table, options: any): any

  hasMany(table: Table, options: any): void

  create(fields: any): any

  destroy(fields: any): any

  findAll(options: any): any
}

export enum Type_Category {
  incomplete,
  decimal,
  primitive,
  list,
  trellis,
}

export interface Type {
  name: string

  get_category(): Type_Category

  get_other_trellis_name(): string
}

export interface Property {
  name: string
  type: Type
  trellis: Trellis
  is_nullable: boolean
  "default": any
  is_unique: boolean
  other_property: Property
  cross_table?: SequelizeTable
  autoIncrement?: boolean
  length?: number

  is_reference(): boolean

  is_list(): boolean

  get_other_trellis(): Trellis

  get_path(): string
}

export interface Trellis {
  oldTable: SequelizeTable
  table: Table
  name: string
  properties: { [name: string]: Property }
  primary_keys: Property[]
  additional: any
  collection: any
  parent?: Trellis
  softDelete?: boolean

  get_identity(input: any): any

  get_lists(): any
}

export interface Table_Trellis extends Trellis {
  oldTable: SequelizeTable
}

export interface CollectionTrellis<T> extends Trellis {
  oldTable: SequelizeTable
  collection: Collection<T>
}

export type Collection_Trellis<T> = CollectionTrellis<T>

export type TrellisMap = { [name: string]: Trellis }
export type TypeMap = { [name: string]: Type }

export interface Library {
  types: TypeMap

}

export interface Schema {
  trellises: TrellisMap
  library: Library
}

export type Trellis_Map = { [name: string]: Trellis }

export interface QueryResult<T> {
  rows: T[]
}

export interface LegacyClient {
  findAll(table: ITableClient, options: any): any
}

export interface LegacyDatabaseInterface {

}

export interface DatabaseClient {
  getLegacyClient(): LegacyClient | undefined

  getLegacyDatabaseInterface(): LegacyDatabaseInterface

  query<T>(sql: string, args?: { [key: string]: any }): PromiseLike<QueryResult<T>>

  createTableInterface(trellis: Trellis, sequelizeModel: SequelizeModel): ITableClient
}

export interface ITableClient {
  // getClient(): DatabaseClient

}

export interface RemoveOptions {
  where: any
}

export interface TableClient<T> extends ITableClient {
  create(newSeed: Partial<T>): Promise<T>

  update(seed: Partial<T>, filter: Partial<T>): Promise<T>

  upsert(newSeed: Partial<T>): Promise<T>

  remove(options: RemoveOptions): Promise<any>
}

export type ThenableCallback<N, O> = (result: O) => N | Promise<N>

export interface QueryBuilder<T, O> {

  /**
   * Executes the query.  This is only needed when `then` may not be called.
   */
  exec(): Promise<O>

  /**
   * Changes a returned foreign key field to be returned as an object instead of a scalar key value.
   *
   *
   * @param path   Path to the foreign key field to be expanded into an object
   */
  expand<T2, O2>(path: string): QueryBuilder<T2, O2>

  /**
   * Filters a result set using a dictionary of key value pairs.
   * Maps to a SQL `WHERE` clause.
   * Currently this function only uses AND logic and does not support OR logic.
   * It also does not support null checks such as `WHERE field IS NULL`
   *
   * @param filters   Dictionary of key/value pairs
   */
  filter(options: any): QueryBuilder<T, T[]>

  /**
   * Returns the first record in a result set
   *
   * @param filters   A dictionary of key/value pairs to filter the result set by
   */
  first(options?: any): QueryBuilder<T, T | undefined>

  /**
   * Truncates a result set.
   * Maps to a SQL `LIMIT` clause.
   *
   * @param start   The offset of the truncation.
   *
   * @param length   The maximum number or records to return
   *
   */
  range(start?: number, length?: number): QueryBuilder<T, O>

  select<T2, O2>(options: any): QueryBuilder<T2, O2>

  /**
   * Sorts a result set.
   * Maps to a SQL `ORDER BY` clause
   *
   * Examples:
   *
   * Ship.all().sort(['speed'])
   *
   * Monster.all().sort(['height', 'desc', 'scariness'])
   *
   * @param args   An array of field names and optional 'asc' or 'desc' modifiers
   *
   *
   */
  sort(args: string[]): QueryBuilder<T, O>

  /**
   * Executes the query and attaches a handler to the promise resolution.
   */
  then<N>(callback: ThenableCallback<N, O>): Promise<N>

  // This function never fully worked right and is complicated to fully support.
  // It is up in the air whether open-ended joins will be supported in the future.
  //
  // join<T2, O2>(collection: ICollection): QueryBuilder<T2, O2>
}

export interface Collection<T> {
  getTrellis(): CollectionTrellis<T>

  getTableClient(): void

  create(seed: any): Promise<T>

  create_or_update(seed: any): Promise<T>

  update(seed: any, changes?: any): Promise<T>

  remove(seed: any): Promise<T>

  all(): QueryBuilder<T, T[]>

  filter(options: any): QueryBuilder<T, T[]>

  first(options?: any): QueryBuilder<T, T | undefined>

  get(identity: any): any
}

export type CollectionMap = { [name: string]: any }

export interface Modeler {
  collections: CollectionMap

  query(sql: string, replacements?: any): PromiseLike<any[]>

  querySingle(sql: string, replacements?: any): PromiseLike<any>

  addDefinitions(definitions: any): void

  getLegacyDatabaseInterface(): any
}

export interface Operation {
  type: Operation_Type
  item?: any
}

export enum Operation_Type {
  add,
  clear,
  remove
}