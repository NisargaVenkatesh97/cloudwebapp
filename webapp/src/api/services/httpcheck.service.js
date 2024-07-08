import HttpCheckModel from '../models/httpcheck.model'
import { BadRequestError, ResourceNotFoundError } from '../utils/error.util'

const getAll = () => {
  return HttpCheckModel.findAll({})
}

const findById = async (id) => {
  try {
    return await HttpCheckModel.findByPk(id)
  } catch (error) {
    throw new ResourceNotFoundError(error.message)
  }
}

const create = async (params) => {
  const {
    name,
    uri,
    is_paused,
    num_retries,
    uptime_sla,
    response_time_sla,
    use_ssl,
    response_status_code,
    check_interval_in_seconds,
  } = params

  try {
    return await HttpCheckModel.create({
      name,
      uri,
      is_paused,
      num_retries,
      uptime_sla,
      response_time_sla,
      use_ssl,
      response_status_code,
      check_interval_in_seconds,
    })
  } catch (error) {
    throw new BadRequestError(error.message)
  }
}

const update = async (id, params) => {
  const {
    name,
    uri,
    is_paused,
    num_retries,
    uptime_sla,
    response_time_sla,
    use_ssl,
    response_status_code,
    check_interval_in_seconds,
  } = params

  try {
    const httpCheck = await HttpCheckModel.findByPk(id)
    if (!httpCheck)
      throw new ResourceNotFoundError(`HttpCheck matching id: ${id} not found`)

    return await httpCheck.update({
      name,
      uri,
      is_paused,
      num_retries,
      uptime_sla,
      response_time_sla,
      use_ssl,
      response_status_code,
      check_interval_in_seconds,
    })
  } catch (error) {
    throw new BadRequestError(error.message)
  }
}

const remove = (id) => {
  try {
    return HttpCheckModel.destroy({ where: { id } })
  } catch (error) {
    throw new BadRequestError(error.message)
  }
}

export default { getAll, create, update, findById, remove }
