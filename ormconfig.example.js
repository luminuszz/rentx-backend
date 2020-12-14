module.exports = [
  {
    name: '',
    type: '',
    host: '',
    port: 5432,
    username: '',
    password: '',
    database: 'rentx',
    entities: ['dist/**/entities/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    cli: {
      migrationsDir: './src/database/migrations',
    },
  },
]
