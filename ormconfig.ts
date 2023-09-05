import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  synchronize: false,
  entities: ['./src/models/**.model{.ts,.js}'],
  migrations: ['dist/migrations/*.js']
})
