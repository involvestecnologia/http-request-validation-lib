const assert = require('assert').strict

const constants = require('../src/constants')
const { BaseFilterParameters } = require('../index')

describe('BaseFilterParameters Unit Tests', function () {
  let parent = {}
  let req = {}
  let fieldsValid = []
  let sortValid = []

  beforeEach(function () {
    fieldsValid = ['name', 'test', 'type']
    sortValid = ['name', '_id']

    parent = {}
    req = {
      query: {
        asc: '_id',
        desc: '_id',
        fields: 'type,name',
        limit: '10',
        offset: '10'
      }
    }
  })

  it('should return not error', function () {
    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
    assert.equal(parameters.parent.asc, '_id')
    assert.equal(parameters.parent.desc, '_id')
    assert.deepEqual(parameters.parent.fields.name, ['type', 'name'])
    assert.deepEqual(parameters.parent.fields.value, { name: 1, type: 1 })
    assert.equal(parameters.parent.limit, 10)
    assert.equal(parameters.parent.offset, 10)
    assert.deepEqual(parameters.parent.sort, { _id: 1 })
  })

  it('should return not error when missing asc', function () {
    delete req.query.asc

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
    assert.deepEqual(parameters.parent.sort, { _id: -1 })
  })

  it('should return error when asc is invalid', function () {
    req.query.asc = 'a'

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors, [constants.errors.asc.invalid])
  })

  it('should return not error when missing desc and asc', function () {
    delete req.query.asc
    delete req.query.desc

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
    assert.deepEqual(parameters.parent.sort, undefined)
  })

  it('should return not error when missing desc', function () {
    delete req.query.desc

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
    assert.deepEqual(parameters.parent.sort, { _id: 1 })
  })

  it('should return error when desc is invalid', function () {
    req.query.desc = 'a'

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors, [constants.errors.desc.invalid])
  })

  it('should return not error when missing fields', function () {
    delete req.query.fields

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
  })

  it('should return error when fields is invalid', function () {
    req.query.fields = '1'

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors, [constants.errors.fields.invalid])
  })

  it('should return not error when missing limit', function () {
    delete req.query.limit

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
  })

  it('should return error when limit is invalid', function () {
    req.query.limit = 'a'

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors, [constants.errors.limit.invalid])
  })

  it('should return not error when missing offset', function () {
    delete req.query.offset

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
  })

  it('should return error when offset is invalid', function () {
    req.query.offset = 'a'

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors, [constants.errors.offset.invalid])
  })
})
