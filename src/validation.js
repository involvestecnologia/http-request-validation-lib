const Joi = require('joi')
const { ObjectID } = require('mongodb')

class Validation {
  static validate (value, innerErrorMessage, errors, prefixError = '') {
    this.value = value
    this.innerErrorMessage = innerErrorMessage
    this.errors = errors
    this.optional = false
    this.valid = true
    this.prefixError = prefixError

    return this
  }

  static isOptional () {
    this.optional = true

    return this
  }

  static isString (minLegth, maxLength) {
    let schema = {}

    if (typeof minLegth === 'undefined' && typeof maxLength === 'undefined') {
      schema = Joi.string().allow('')
    } else if (minLegth === 0) {
      schema = Joi.string().allow('')
        .min(minLegth)
        .max(maxLength)
    } else {
      schema = Joi.string().min(minLegth)
        .max(maxLength)
    }

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage)

    return this
  }

  static isNumber () {
    const schema = Joi.number()

    const { isNullOrUndefined, valid } = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage)

    this.valid = valid

    if (isNullOrUndefined) return this

    if (typeof this.value === 'number' && !isNaN(this.value) && !schema.validate(this.value).error) return this

    this.valid = false
    this.errors.push(this.prefixError + this.innerErrorMessage.invalid)

    return this
  }

  static isBoolean () {
    const schema = Joi.boolean().strict()

    _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage)

    return this
  }

  static isObject () {
    const schema = Joi.object()

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage)

    return this
  }

  static isObjectNotEmpty () {
    const { isNullOrUndefined, valid } = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage)

    this.valid = valid

    if (isNullOrUndefined) return this

    const schema = Joi.object()
    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage)

    if (!this.valid || !_isEmptyObject(this.value)) return this

    this.valid = false
    this.errors.push(this.prefixError + this.innerErrorMessage.invalid)

    return this
  }

  static isObjectId () {
    const { isNullOrUndefined, valid } = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage)

    this.valid = valid

    if (isNullOrUndefined) return this

    if (ObjectID.isValid(this.value)) return this

    this.valid = false
    this.errors.push(this.prefixError + this.innerErrorMessage.invalid)

    return this
  }

  static isEmail () {
    const schema = Joi.string().email()

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage)

    return this
  }

  static isUUID () {
    const schema = Joi.string().guid({
      version: [
        'uuidv1',
        'uuidv4'
      ]
    })

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage)

    return this
  }

  static isArray () {
    const schema = Joi.array()

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage)

    return this
  }

  static isArrayNotEmpty () {
    const schema = Joi.array()

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage)

    if (!this.valid || this.value.length > 0) return this

    this.valid = false
    this.errors.push(this.prefixError + this.innerErrorMessage.invalid)

    return this
  }

  static custom (func) {
    const { isNullOrUndefined, valid } = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage)

    this.valid = valid

    if (isNullOrUndefined) return this

    const isValid = func(this.value)

    if (isValid) return this

    this.valid = false
    this.errors.push(this.prefixError + this.innerErrorMessage.invalid)

    return this
  }

  static isValid (func) {
    if (this.valid) {
      func()
    }

    return this
  }
}

const _isNullOrUndefined = (value) => value === null || typeof value === 'undefined'

const _isEmptyObject = (object) => !Object.getOwnPropertySymbols(object).length && !Object.getOwnPropertyNames(object).length

const _verifyNullOrUndefined = (optional, value, errors, innerErrorMessage) => {
  const isNullOrUndefined = _isNullOrUndefined(value)

  if (optional && isNullOrUndefined) return { isNullOrUndefined: true, valid: true }

  if (!isNullOrUndefined) return { isNullOrUndefined: false, valid: true }

  this.valid = false
  errors.push(innerErrorMessage.required)
  return { isNullOrUndefined: true, valid: false }
}

const _validation = (schema, optional, value, errors, innerErrorMessage) => {
  const { isNullOrUndefined, valid } = _verifyNullOrUndefined(optional, value, errors, innerErrorMessage)

  if (isNullOrUndefined) return valid

  if (!schema.validate(value).error) return valid

  errors.push(innerErrorMessage.invalid)

  return false
}

module.exports = Validation
