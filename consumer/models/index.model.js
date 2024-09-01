import { Sequelize } from 'sequelize'
import appConfig from '../config/app.config.js'
import logger from '../config/logger.config.js'
import HttpCheck, {
  attributes as HttpCheckAttributes,
  options as HttpCheckOptions,
} from './httpcheck.model.js'

const { USER, PASSWORD, DB, DBHOST, DBPORT, DBSCHEMA } = appConfig

export const initializeDatabase = async () => {
  try {
    // Initialize DB connection with Sequelize instance
    const sequelize = new Sequelize(
      `postgres://${USER}:${PASSWORD}@${DBHOST}:${DBPORT}/${DB}`,
      {
        schema: DBSCHEMA,
        logging: (message) => logger.verbose(message),
      }
    )
    // Initialize HttpCheck Model
    HttpCheck.init(HttpCheckAttributes, { ...HttpCheckOptions, sequelize })

    return sequelize.sync({ alter: true })
  } catch (error) {
    logger.error(`Unable to connect to database ${DB}:`, { err: error })
  }
}
