import HttpCheckModel from '../models/httpcheck.model.js'

const create = async (params) => {
  const {
    http_check_id,
    name,
    uri,
    num_retries,
    // is_paused,
    // uptime_sla,
    // response_time_sla,
    // use_ssl,
    response_status_code,
    // check_interval_in_seconds,
  } = params
  const save = await HttpCheckModel.create({
    http_check_id,
    name,
    uri,
    num_retries,
    // is_paused,
    // uptime_sla,
    // response_time_sla,
    // use_ssl,
    response_status_code,
    // check_interval_in_seconds,
  })
  return save
}

export default create
