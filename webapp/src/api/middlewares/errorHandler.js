import { Validator } from 'jsonschema'
import { readFileSync } from 'fs'
import logger from '../../configs/logger.config'
import { BadRequestError } from '../utils/error.util'

const validator = new Validator()
const schemaPath = '../schemas/http-check-schema.json'
const schemaData = readFileSync(require.resolve(schemaPath))
const jsonSchema = JSON.parse(schemaData)

export const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500
  const errMessage = err.message || 'Something went wrong'
  const meta = {
    error: err.name,
    message: errMessage,
    data: err.data,
    // stack: err.stack,
  }
  res.status(errStatus).json(meta)
  logger.error(errMessage, meta)
}

export const validationMiddleware = (req, res, next) => {
  const { errors } = validator.validate(req.body, jsonSchema)
  if (errors.length > 0) {
    throw new BadRequestError('Invalid request body', errors)
  }
  next()
}
