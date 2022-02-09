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

  static isString (minLength, maxLength, notAllowedValues) {
    let schema = {}

    if (typeof minLength === 'undefined' && typeof maxLength === 'undefined') {
      schema = Joi.string().allow('')
    } else if (minLength === 0) {
      schema = Joi.string().allow('')
        .min(minLength)
        .max(maxLength)
    } else {
      schema = Joi.string().min(minLength)
        .max(maxLength)
    }

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    if (notAllowedValues && !Array.isArray(notAllowedValues)) {
      throw new Error('notAllowedValues must be an array')
    }

    if (Array.isArray(notAllowedValues) && notAllowedValues.indexOf(this.value) > -1) {
      this.errors.push(this.innerErrorMessage.invalid)
    }

    return this
  }

  static isStringEnum (enumArray) {
    const schema = Joi.string()

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    if (!this.valid) return this

    if (!enumArray.includes(this.value)) {
      this.valid = false
      this.errors.push(this.prefixError + this.innerErrorMessage.invalid)
    }

    return this
  }

  static isNumber () {
    const schema = Joi.number().integer()

    const { isNullOrUndefined, valid } = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    this.valid = valid

    if (isNullOrUndefined) return this

    if (typeof this.value === 'number' && !isNaN(this.value) && !schema.validate(this.value).error) return this

    this.valid = false
    this.errors.push(this.prefixError + this.innerErrorMessage.invalid)

    return this
  }

  static isFloat () {
    const schema = Joi.number()

    const { isNullOrUndefined, valid } = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    this.valid = valid

    if (isNullOrUndefined) return this

    if (typeof this.value === 'number' && !isNaN(this.value) && !schema.validate(this.value).error) return this

    this.valid = false
    this.errors.push(this.prefixError + this.innerErrorMessage.invalid)

    return this
  }

  static isDateISO () {
    const schema = Joi.date().iso()

    _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    return this
  }

  static isBoolean () {
    const schema = Joi.boolean().strict()

    _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    return this
  }

  static isObject () {
    const schema = Joi.object()

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    return this
  }

  static isObjectNotEmpty () {
    const { isNullOrUndefined, valid } = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    this.valid = valid

    if (isNullOrUndefined) return this

    const schema = Joi.object()
    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    if (!this.valid || !_isEmptyObject(this.value)) return this

    this.valid = false
    this.errors.push(this.prefixError + this.innerErrorMessage.invalid)

    return this
  }

  static isObjectId () {
    const { isNullOrUndefined, valid } = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    this.valid = valid

    if (isNullOrUndefined) return this

    if (ObjectID.isValid(this.value)) return this

    this.valid = false
    this.errors.push(this.prefixError + this.innerErrorMessage.invalid)

    return this
  }

  static isEmail () {
    const schema = Joi.string().email()

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    return this
  }

  static isUUID () {
    const schema = Joi.string().guid({
      version: [
        'uuidv1',
        'uuidv4'
      ]
    })

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    return this
  }

  static isArray () {
    const schema = Joi.array()

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    return this
  }

  static isArrayMatch (validArray) {
    const { isNullOrUndefined, valid } = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    this.valid = valid

    if (isNullOrUndefined) return this

    const fieldRegex = new RegExp(`^(${validArray.join('|')})$`, 'u')

    for (const field of this.value) {
      if (!fieldRegex.test(field)) {
        this.errors.push(this.prefixError + this.innerErrorMessage.invalid)
        this.valid = false
        break
      }
    }

    return this
  }

  static isArrayNotEmpty () {
    const schema = Joi.array()

    this.valid = _validation(schema, this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

    if (!this.valid || this.value.length > 0) return this

    this.valid = false
    this.errors.push(this.prefixError + this.innerErrorMessage.invalid)

    return this
  }

  static custom (func) {
    const { isNullOrUndefined, valid } = _verifyNullOrUndefined(this.optional, this.value, this.errors, this.innerErrorMessage, this.prefixError)

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

const _verifyNullOrUndefined = (optional, value, errors, innerErrorMessage, prefixError) => {
  const isNullOrUndefined = _isNullOrUndefined(value)

  if (optional && isNullOrUndefined) return { isNullOrUndefined: true, valid: true }

  if (!isNullOrUndefined) return { isNullOrUndefined: false, valid: true }

  this.valid = false
  errors.push(prefixError + innerErrorMessage.required)
  return { isNullOrUndefined: true, valid: false }
}

const _validation = (schema, optional, value, errors, innerErrorMessage, prefixError) => {
  const { isNullOrUndefined, valid } = _verifyNullOrUndefined(optional, value, errors, innerErrorMessage, prefixError)

  if (isNullOrUndefined) return valid

  if (!schema.validate(value).error) return valid

  errors.push(prefixError + innerErrorMessage.invalid)

  return false
}

module.exports = Validation
