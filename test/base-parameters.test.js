const assert = require('assert').strict

const constants = require('../src/constants')
const { BaseParameters } = require('../index')

describe('BaseParameters Unit Tests', function () {
  let parent = {}
  let req = {}

  beforeEach(function () {
    parent = {}
    req = {
      headers: {
        [constants.headers.requestId]: '5a90c78c-3adb-41f8-b166-2fb38c9baa24',
        [constants.headers.schema]: 'foo_bar'
      }
    }
  })

  describe('should return REQUEST_ID_IS_REQUIRED and SCHEMA_IS_REQUIRED when', function () {
    const expectedErrors = ['REQUEST_ID_IS_REQUIRED', 'SCHEMA_IS_REQUIRED']

    it('request is undefined', function () {
      const parameters = BaseParameters.new(parent)
      parameters.validate()

      assert.deepEqual(parent.errors, expectedErrors)
    })

    it('request is null', function () {
      const parameters = BaseParameters.new(parent, null)
      parameters.validate()

      assert.deepEqual(parent.errors, expectedErrors)
    })

    it('request dont have headers', function () {
      const parameters = BaseParameters.new(parent, {})
      parameters.validate()

      assert.deepEqual(parent.errors, expectedErrors)
    })
  })

  it('should return REQUEST_ID_IS_REQUIRED when missing x-request-id header', function () {
    delete req.headers[constants.headers.requestId]

    const parameters = BaseParameters.new(parent, req)
    parameters.validate()

    assert.deepEqual(parent.errors, ['REQUEST_ID_IS_REQUIRED'])
  })

  it('should return REQUEST_ID_INVALID when x-request-id header is malformed', function () {
    req.headers[constants.headers.requestId] = 'foo'

    const parameters = BaseParameters.new(parent, req)
    parameters.validate()

    assert.deepEqual(parent.errors, ['REQUEST_ID_INVALID'])
  })

  it('should return SCHEMA_IS_REQUIRED when missing x-involves-schema header', function () {
    delete req.headers[constants.headers.schema]

    const parameters = BaseParameters.new(parent, req)
    parameters.validate()

    assert.deepEqual(parent.errors, ['SCHEMA_IS_REQUIRED'])
  })

  it('should return SCHEMA_IS_INVALID when x-involves-schema header is malformed', function () {
    req.headers[constants.headers.schema] = 123

    const parameters = BaseParameters.new(parent, req)
    parameters.validate()

    assert.deepEqual(parent.errors, ['SCHEMA_IS_INVALID'])
  })

  it('should return no errors', function () {
    const parameters = BaseParameters.new(parent, req)
    parameters.validate()

    assert.deepEqual(parent.errors, [])
  })
})
