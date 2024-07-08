const { Validator } = require('jsonschema')
const { readFileSync } = require('fs')

const validator = new Validator()
const schemaData = readFileSync(
  require.resolve('../schemas/http-check-schema.json')
)
const jsonSchema = JSON.parse(schemaData)

const validate = (reqBody) => {
  if (validator.validate(reqBody, jsonSchema).errors.length < 1) {
    return true
  }
  return false
}

export default validate
