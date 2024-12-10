import 'dotenv/config'

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
} = process.env
const producerConfig = {
  BROKER_0,
  BROKER_1,
  BROKER_2,
  CLIENT_ID,
  TOPIC,
  URL,
  NAME,
  RETRIES,
  HTTP_CHECK_ID,
}

export default producerConfig
