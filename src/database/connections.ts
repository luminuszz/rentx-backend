import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const pgConnection: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'rentx',
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
}
