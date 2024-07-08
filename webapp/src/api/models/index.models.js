import { Sequelize } from 'sequelize'
import appConfig from '../../configs/app.config'
import logger from '../../configs/logger.config'
import HttpCheck, {
  attributes as HttpCheckAttributes,
  options as HttpCheckOptions,
} from './httpcheck.model'

const { USER, PASSWORD, DB, DBHOST, DBPORT, DBSCHEMA } = appConfig

export async function initializeDatabase() {
  try {
    // Initialize DB connection with Sequelize instance
    const sequelize = new Sequelize(
      `postgres://${USER}:${PASSWORD}@${DBHOST}:${DBPORT}/${DB}`,
      {
        schema: DBSCHEMA,
        logging: (message) => logger.info(message),
      }
    )

    // Initialize HttpCheck Model
    HttpCheck.init(HttpCheckAttributes, { ...HttpCheckOptions, sequelize })

    return sequelize.sync({ alter: true })
  } catch (error) {
    logger.error('Unable to connect to the database:', { error })
  }
}
