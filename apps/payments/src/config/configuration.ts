export default () => ({
    db: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || 5432,
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DB || 'payments',
    },
    kafka: {
        broker: process.env.KAFKA_BROKER || 'localhost:9092',
        clientId: process.env.KAFKA_CLIENT_ID || 'payments-consumer',
        consumerGroupId: process.env.KAFKA_CONSUMER_GROUP_ID || 'payments-consumer-group',
    },
    app: {
        port: 3001,
    },
});
