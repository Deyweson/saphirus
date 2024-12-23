import Knex from 'knex'
import { GetDBConfig } from './db-services'

const dbConfig = GetDBConfig()
export const db = Knex({
  client: 'pg',
  connection: {
    host: dbConfig?.host,
    port: Number(dbConfig?.port),
    user: dbConfig?.user,
    password: dbConfig?.password.toString(),
    database: dbConfig?.database
  }
})
