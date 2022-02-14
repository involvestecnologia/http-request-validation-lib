
const constants = require('./constants')
const Validation = require('./validation')

class BaseFilterParameters {
  static new (parent, req) {
    parent.errors = []

    parent.asc = req.query.asc
    parent.desc = req.query.desc
    parent.offset = req.query.offset && parseInt(req.query.offset, 10)
    parent.limit = req.query.limit && parseInt(req.query.limit, 10)
    parent.fields = _parseFields(req.query.fields)
    parent.sort = _parseSort(parent)

    this.parent = parent

    return this
  }

  static validate (fieldsValid, sortValid) {
    Validation
      .validate(this.parent.asc, constants.errors.asc, this.parent.errors)
      .isOptional()
      .isArrayMatch(sortValid)

    Validation
      .validate(this.parent.desc, constants.errors.desc, this.parent.errors)
      .isOptional()
      .isArrayMatch(sortValid)

    Validation
      .validate(this.parent.fields.name, constants.errors.fields, this.parent.errors)
      .isOptional()
      .isArrayMatch(fieldsValid)

    Validation
      .validate(this.parent.offset, constants.errors.offset, this.parent.errors)
      .isOptional()
      .isNumber()

    Validation
      .validate(this.parent.limit, constants.errors.limit, this.parent.errors)
      .isOptional()
      .isNumber()
  }
}

const _parseFields = (queryField) => {
  if (queryField === undefined) {
    return {
      name: undefined,
      value: undefined
    }
  }

  const fields = queryField.split(',')
  const result = {}

  for (const field of fields) {
    result[field] = 1
  }

  return {
    name: fields,
    value: result
  }
}

const _parseSort = (parent) => {
  if (parent.asc === undefined && parent.desc === undefined) return undefined

  if (parent.asc) {
    return {
      [parent.asc]: 1
    }
  }

  return {
    [parent.desc]: -1
  }
}

module.exports = BaseFilterParameters
