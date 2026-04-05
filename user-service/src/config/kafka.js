async function disconnectProducer() {
    // Kafka producer is not initialized yet in this service.
    return Promise.resolve();
}

module.exports = { disconnectProducer };
