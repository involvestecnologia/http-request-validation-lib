'use strict'

const constants = require('./constants')
const Validation = require('./validation')

class BaseParameters {
  static new (parent, req) {
    parent.requestId = req?.headers?.[constants.headers.requestId]
    parent.schema = req?.headers?.[constants.headers.schema]
    parent.errors = []
    this.parent = parent
    return this
  }

  static validate () {
    Validation
      .validate(this.parent.requestId, constants.errors.requestId, this.parent.errors)
      .isString(36, 36)

    Validation
      .validate(this.parent.schema, constants.errors.schema, this.parent.errors)
      .isString()
  }
}

module.exports = BaseParameters
