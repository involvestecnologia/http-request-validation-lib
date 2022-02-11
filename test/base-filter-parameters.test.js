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
        _asc: '_id',
        _desc: '_id',
        _fields: 'type,name',
        _limit: '10',
        _offset: '10'
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

  it('should return not error when missing _asc', function () {
    delete req.query._asc

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
    assert.deepEqual(parameters.parent.sort, { _id: -1 })
  })

  it('should return error when _asc is invalid', function () {
    req.query._asc = 'a'

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors, [constants.errors.asc.invalid])
  })

  it('should return not error when missing _desc and _asc', function () {
    delete req.query._asc
    delete req.query._desc

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
    assert.deepEqual(parameters.parent.sort, undefined)
  })

  it('should return not error when missing _desc', function () {
    delete req.query._desc

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
    assert.deepEqual(parameters.parent.sort, { _id: 1 })
  })

  it('should return error when _desc is invalid', function () {
    req.query._desc = 'a'

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors, [constants.errors.desc.invalid])
  })

  it('should return not error when missing _fields', function () {
    delete req.query._fields

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
  })

  it('should return error when _fields is invalid', function () {
    req.query._fields = '1'

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors, [constants.errors.fields.invalid])
  })

  it('should return not error when missing _limit', function () {
    delete req.query._limit

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
  })

  it('should return error when _limit is invalid', function () {
    req.query._limit = 'a'

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors, [constants.errors.limit.invalid])
  })

  it('should return not error when missing _offset', function () {
    delete req.query._offset

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors.length, 0)
  })

  it('should return error when _offset is invalid', function () {
    req.query._offset = 'a'

    const parameters = BaseFilterParameters.new(parent, req)
    parameters.validate(fieldsValid, sortValid)

    assert.deepEqual(parent.errors, [constants.errors.offset.invalid])
  })
})
