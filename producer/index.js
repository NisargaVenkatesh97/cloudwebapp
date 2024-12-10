import { Kafka, Partitioners } from 'kafkajs'
import logger from './config/logger.config.js'
import producerConfig from './config/app.config.js'

const {
  BROKER_0,
  BROKER_1,
  BROKER_2,
  CLIENT_ID,
  TOPIC,
  URL,
  NAME,
  RETRIES,
  HTTP_CHECK_ID,
} = producerConfig
const topic = TOPIC
const brokers = [BROKER_0, BROKER_1, BROKER_2]

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers,
})

const quitIstioProxy = async () => {
  fetch('http://localhost:15000/quitquitquit', {
    method: 'POST',
  })
    .then((res) => {
      logger.info('Sent quit message to istio-proxy', { res })
    })
    .catch((err) => {
      logger.error('Could not send quit request to istio-proxy', { err })
    })
}

const init = async () => {
  try {
    // https://kafka.js.org/docs/producing#default-partitioners
    const producer = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    })
    await producer.connect()
    const response = await fetch(URL)
    const status = await response.status
    const data = {
      http_check_id: HTTP_CHECK_ID,
      name: NAME,
      uri: URL,
      num_retries: RETRIES,
      response_status_code: status,
    }
    producer
      .send({
        topic,
        messages: [
          {
            // TODO: add logic for partitioning of messages
            // partition: 1, // if not specified, msg will be sent based on key
            // key: 'heartbeat', // if not specified, msg will be sent in round-robin fashion
            value: JSON.stringify(data),
          },
        ],
      })
      .then((res) => {
        logger.info(`Message sent:`, { msg: data, res })
      })
      .catch((err) => logger.error(`Message not sent`, { err }))
      .finally(async () => {
        quitIstioProxy()
        await producer.disconnect() // performs clean exit
      })
  } catch (error) {
    logger.error(`Kafka producer error`, { error })
    quitIstioProxy()
    process.exit(1)
  }
}

init()
