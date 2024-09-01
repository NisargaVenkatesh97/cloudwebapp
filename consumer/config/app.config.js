import 'dotenv/config'

const {
  BROKER_0,
  BROKER_1,
  BROKER_2,
  CLIENT_ID,
  TOPIC,
  USER,
  PASSWORD,
  DB,
  DBPORT,
  DBHOST,
  DBSCHEMA,
} = process.env
const consumerConfig = {
  BROKER_0,
  BROKER_1,
  BROKER_2,
  CLIENT_ID,
  TOPIC,
  USER,
  PASSWORD,
  DB,
  DBPORT,
  DBHOST,
  DBSCHEMA,
}

export default consumerConfig
