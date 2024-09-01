# Kafka Consumer

This is a simple Kafka consumer application that subscribes to the configured Kafka brokers and consumes the messages published by the producer application.

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
