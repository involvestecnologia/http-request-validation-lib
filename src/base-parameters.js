'use strict'

const constants = require('./constants')
const Validation = require('./validation')

class BaseParameters {
  static new (req) {
    this.requestId = req?.headers?.[constants.headers.requestId]
    this.schema = req?.headers?.[constants.headers.schema]
    this.errors = []
    return this
  }

  static validate () {
    Validation
      .validate(this.requestId, constants.errors.requestId, this.errors)
      .isString(36, 36)

    Validation
      .validate(this.schema, constants.errors.schema, this.errors)
      .isString()
  }
}

module.exports = BaseParameters
