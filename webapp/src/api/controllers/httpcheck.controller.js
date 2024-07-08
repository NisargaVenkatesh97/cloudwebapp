import service from '../services/httpcheck.service'
import {
  BadRequestError,
  ResourceNotFoundError,
  ServiceUnavailableError,
} from '../utils/error.util'
import { httpStatusCodes } from '../../constants/responseCodes'
import {
  createCustomResource,
  deleteCustomResource,
  patchCustomResource,
} from '../utils/k8s.util'

/**
 * `get` controller for GET `/v1/http-check/:id` endpoint
 * @param {*} req API request parameter
 * @param {*} res API response
 * @param {*} next API errorHandler middleware
 * @returns HTTP 200 OK, 404 Resource Not Found, 503 Service Unavailable
 */
export const get = async (req, res, next) => {
  try {
    if (req.params.id) {
      const httpCheck = await service.findById(req.params.id)
      if (!httpCheck) throw new ResourceNotFoundError(`HttpCheck not found`)

      return res.status(200).json(httpCheck)
    }

    const httpChecks = await service.getAll()
    if (!httpChecks) throw new ServiceUnavailableError()

    return res.status(200).json(httpChecks)
  } catch (error) {
    next(error)
  }
}

/**
 * `create` controller for POST `/v1/http-check` endpoint
 * @param {*} req API request parameter
 * @param {*} res API response
 * @param {*} next API errorHandler middleware
 * @returns HTTP 201 Created, 400 Bad Request, 503 Service Unavailable
 */
export const create = async (req, res, next) => {
  try {
    if (!httpStatusCodes.includes(req.body.response_status_code))
      throw new BadRequestError(
        'response_status_code must be a valid HTTP response code'
      )

    const httpCheck = await service.create(req.body)
    if (!httpCheck) throw new ServiceUnavailableError()

    createCustomResource({
      id: httpCheck.id,
      name: httpCheck.name,
      url: httpCheck.uri,
      retries: httpCheck.num_retries,
      res_code: httpCheck.response_status_code,
    })

    return res.status(201).json(httpCheck)
  } catch (error) {
    next(error)
  }
}

/**
 * `update` controller for PUT `/v1/http-check/:id` endpoint
 * @param {*} req API request parameter
 * @param {*} res API response
 * @param {*} next API errorHandler middleware
 * @returns HTTP 204 No Content, 400 Bad Request, 503 Service Unavailable
 */
export const update = async (req, res, next) => {
  try {
    if (!req.params.id) throw new BadRequestError('Invalid id')

    if (!httpStatusCodes.includes(req.body.response_status_code))
      throw new BadRequestError(
        'response_status_code must be a valid HTTP response code'
      )

    const updatedHttpCheck = await service.update(req.params.id, req.body)
    if (!updatedHttpCheck) throw new ServiceUnavailableError()

    patchCustomResource(updatedHttpCheck.id, {
      id: updatedHttpCheck.id,
      name: updatedHttpCheck.name,
      url: updatedHttpCheck.uri,
      retries: updatedHttpCheck.num_retries,
      res_code: updatedHttpCheck.response_status_code,
    })

    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

/**
 * `remove` controller for DELETE `/v1/http-check/:id` endpoint
 * @param {*} req API request parameter
 * @param {*} res API response
 * @param {*} next API errorHandler middleware
 * @returns HTTP 204 No Content, 400 Bad Request, 503 Service Unavailable
 */
export const remove = async (req, res, next) => {
  try {
    if (!req.params.id) throw new BadRequestError('Invalid id')

    const httpCheck = await service.findById(req.params.id)

    const deletedCount = await service.remove(req.params.id)
    if (!deletedCount)
      throw new ResourceNotFoundError("HttpCheck doesn't exist")

    deleteCustomResource(httpCheck.id)

    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
