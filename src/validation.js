const Joi = require('joi')
const { ObjectID } = require('mongodb')

class Validation {
  static validate (value, innerErrorMessage, errors) {
    this.value = value
    this.innerErrorMessage = innerErrorMessage
    this.errors = errors
    this.optional = false

    return this
  }

  static isOptional () {
    this.optional = true

    return this
  }

  static isString (minLegth, maxLength) {
    let schema

    if (minLegth === undefined && maxLength === undefined) {
      schema = Joi.string().allow('')
    } else {
      if (minLegth === 0) {
        schema = Joi.string().allow('').min(minLegth).max(maxLength)
      } else {
        schema = Joi.string().min(minLegth).max(maxLength)
      }
    }

    _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage)

    return this
  }

  static isNumber () {
    const schema = Joi.number()

    const isNullOrUndefined = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage)

    if (isNullOrUndefined) return this

    if (typeof this.value === 'number' && isNaN(this.value) && !schema.validate(this.value).error) return this

    this.errors.push(this.innerErrorMessage.invalid)

    return this
  }

  static isBoolean () {
    const schema = Joi.boolean().strict()

    _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage)

    return this
  }

  static isObject () {
    const schema = Joi.object()

    _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage)

    return this
  }

  static isObjectNotEmpty () {
    const isNullOrUndefined = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage)

    if (isNullOrUndefined) return this

    if (typeof this.value === 'object' && !_isEmptyObject(this.value)) return this

    this.errors.push(this.innerErrorMessage.invalid)

    return this
  }

  static isObjectId () {
    const isNullOrUndefined = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage)

    if (isNullOrUndefined) return this

    if (ObjectID.isValid(this.value)) return this

    this.errors.push(this.innerErrorMessage.invalid)

    return this
  }

  static custom (func) {
    const isNullOrUndefined = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage)

    if (isNullOrUndefined) return this

    const isValid = func(this.value)

    if (isValid) return this

    this.errors.push(this.innerErrorMessage.invalid)

    return this
  }
}

const _isNullOrUndefined = (value) => value === null || value === undefined

const _isEmptyObject = object => !Object.getOwnPropertySymbols(object).length && !Object.getOwnPropertyNames(object).length

const _verifyNullOrUndefined = (optional, value, errors, innerErrorMessage) => {
  const isNullOrUndefined = _isNullOrUndefined(value)

  if (optional && isNullOrUndefined) return true

  if (!isNullOrUndefined) return false

  errors.push(innerErrorMessage.required)
  return true
}

const _validation = (schema, optional, value, errors, innerErrorMessage) => {
  const isNullOrUndefined = _verifyNullOrUndefined(optional, value, errors, innerErrorMessage)

  if (isNullOrUndefined) return

  if (!schema.validate(value).error) return

  errors.push(innerErrorMessage.invalid)
}

module.exports = Validation
