export default () => ({
  broker: process.env.BROKER ?? 'localhost:9092',
  services: {
    tickets: {
      clientId: 'tickets',
      groupId: 'tickets',
      name: 'tickets-kafka-client',
    },
    payments: {
      clientId: 'payments',
      groupId: 'payments',
      name: 'payments-kafka-client',
    },
    flights: {
      clientId: 'flights',
      groupId: 'flights',
      name: 'flights-kafka-client',
    },
    auth: {
      clientId: 'authorization',
      groupId: 'authorization',
      name: 'authorization-kafka-client',
    },
  },
  postgres: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5434,
    username: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: process.env.POSTGRES_DATABASE ?? 'tickets',
  }
});
