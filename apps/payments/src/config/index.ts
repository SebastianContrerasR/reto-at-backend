export default () => ({
  broker: process.env.BROKER ?? 'localhost:9092',
  services: {
    payments: {
      clientId: 'payments',
      groupId: 'payments',
      name: 'payments-kafka-client',
    },
  },
  postgres: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5433,
    username: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: process.env.POSTGRES_DATABASE ?? 'payments',
  }
});
