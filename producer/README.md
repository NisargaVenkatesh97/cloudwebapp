# Kafka Producer

This is a simple Kafka producer application that publishes messages to the configured Kafka brokers and to particular partition, based on a partitioning logic.

## Build

To build the docker image:

```bash
docker build -t <username>/<image-name>:[tag] -f <Dockerfile> .
```

## Push to DockerHub

To push the built image to dockerHub:

```bash
docker image push <username>/<image-name>:[tag]
```
