export default () => ({
  broker: process.env.BROKER ?? 'localhost:9092',
  services: {
    auth: {
      clientId: 'authorization',
      groupId: 'authorization',
      name: 'authorization-kafka-client',
    },
  },
  postgres: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5435,
    username: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: process.env.POSTGRES_DATABASE ?? 'users',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'yoursecret',
    expiresIn: '1h',
  }
});
