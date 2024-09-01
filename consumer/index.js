import { Kafka } from 'kafkajs'
import logger from './config/logger.config.js'
import consumerConfig from './config/app.config.js'
import create from './services/httpcheck.service.js'
import { initializeDatabase } from './models/index.model.js'

const { BROKER_0, BROKER_1, BROKER_2, CLIENT_ID, TOPIC, DB } = consumerConfig
const topics = [TOPIC]
const groupId = process.argv[2] || 'consumerGroup'
const brokers = [BROKER_0, BROKER_1, BROKER_2]

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers,
})

const init = async () => {
  try {
    const consumer = kafka.consumer({ groupId })
    await consumer.connect()

    await consumer.subscribe({
      topics,
      fromBeginning: true,
    })

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        const parsedMessage = JSON.parse(message.value)
        const httpCheck = await create(parsedMessage)
        if (httpCheck) {
          logger.info(`Saved in database ${DB}:`, { msg: parsedMessage })
          logger.info(`${groupId}: [${topic}]: PART:${partition}`, {
            msg: parsedMessage,
          })
        } else {
          logger.error(`Unable to save in database ${DB}`, { err: httpCheck })
        }
      },
    })
  } catch (error) {
    logger.log(`Kafka consumer error: ${error}`)
    process.exit(1)
  }
}

initializeDatabase()
  .then(() => {
    logger.info(`Successfully connected to database`, { db: DB })
  })
  .then(init())
  .catch((error) => {
    logger.error(`Unable to initialize database ${DB}`, { err: error })
    process.exit(1)
  })
