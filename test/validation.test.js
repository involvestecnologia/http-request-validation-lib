const assert = require('assert').strict
const sandbox = require('sinon').createSandbox()

const { ObjectID } = require('mongodb')
const { Validation } = require('../index')

const INVALID_KEY = 'invalid_key'
const MISSING_KEY = 'missing_key'

const ERROR_MSGS = {
  invalid: INVALID_KEY,
  required: MISSING_KEY
}

const shouldReturnInvalidErrorWhenGivenEmptyString = 'should return invalid error when given empty string'
const shouldReturnInvalidErrorWhenGivenRandomString = 'should return invalid error when given random string'
const shouldReturnInvalidErrorWhenGivenNumber = 'should return invalid error when given number'
const shouldReturnInvalidErrorWhenGivenObject = 'should return invalid error when given object'
const shouldReturnInvalidErrorWhenGivenString = 'should return invalid error when given string'
const shouldReturnMissingErrorWhenGivenNull = 'should return missing error when given null'
const shouldReturnMissingErrorWhenGivenUndefined = 'should return missing error when given undefined'

describe('Validation tool test suite', function () {
  let errors = {}

  beforeEach(function () {
    errors = []
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('String', function () {
    it('should not return errors when given string', function () {
      const input = '1'
      Validation.validate(input, ERROR_MSGS, errors).isString()
      assert.equal(errors.length, 0)
    })

    it('should not return errors when given empty string', function () {
      const input = ''
      Validation.validate(input, ERROR_MSGS, errors).isString()
      assert.equal(errors.length, 0)
    })

    it(shouldReturnInvalidErrorWhenGivenNumber, function () {
      const input = 1
      Validation.validate(input, ERROR_MSGS, errors).isString()
      assert.equal(errors[0], INVALID_KEY)
    })

    it('should return invalid error when given boolean', function () {
      const input = true
      Validation.validate(input, ERROR_MSGS, errors).isString()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenObject, function () {
      const input = {}
      Validation.validate(input, ERROR_MSGS, errors).isString()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenNull, function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors).isString()
      assert.equal(errors[0], MISSING_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenUndefined, function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors).isString()
      assert.equal(errors[0], MISSING_KEY)
    })

    describe('Minimum and maximum length is set', function () {
      it('should not return errors when given string with minimum length', function () {
        const input = '1'
        Validation.validate(input, ERROR_MSGS, errors).isString(1, 255)
        assert.equal(errors.length, 0)
      })

      it('should not return errors when given string is empty but minimum length is zero', function () {
        const input = ''
        Validation.validate(input, ERROR_MSGS, errors).isString(0, 255)
        assert.equal(errors.length, 0)
      })

      it('should return invalid error when given string dont have the minimum length', function () {
        const input = '1'
        Validation.validate(input, ERROR_MSGS, errors).isString(32, 32)
        assert.equal(errors[0], INVALID_KEY)
      })

      it('should return invalid error when given string exceeds the maximum length', function () {
        const input = 'abc'
        Validation.validate(input, ERROR_MSGS, errors).isString(1, 2)
        assert.equal(errors[0], INVALID_KEY)
      })
    })
  })

  describe('Number', function () {
    it('should not return errors when given number', function () {
      const input = 1
      Validation.validate(input, ERROR_MSGS, errors).isNumber()
      assert.equal(errors.length, 0)
    })

    it(shouldReturnInvalidErrorWhenGivenString, function () {
      const input = '1'
      Validation.validate(input, ERROR_MSGS, errors).isNumber()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenEmptyString, function () {
      const input = ''
      Validation.validate(input, ERROR_MSGS, errors).isNumber()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenRandomString, function () {
      const input = 'foo bar'
      Validation.validate(input, ERROR_MSGS, errors).isNumber()
      assert.equal(errors[0], INVALID_KEY)
    })

    it('should return invalid error when given boolean', function () {
      const input = true
      Validation.validate(input, ERROR_MSGS, errors).isNumber()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenObject, function () {
      const input = {}
      Validation.validate(input, ERROR_MSGS, errors).isNumber()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenNull, function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors).isNumber()
      assert.equal(errors[0], MISSING_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenUndefined, function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors).isNumber()
      assert.equal(errors[0], MISSING_KEY)
    })
  })

  describe('Boolean', function () {
    it('should not return errors when given boolean', function () {
      const input = true
      Validation.validate(input, ERROR_MSGS, errors).isBoolean()
      assert.equal(errors.length, 0)
    })

    it(shouldReturnInvalidErrorWhenGivenNumber, function () {
      const input = 1
      Validation.validate(input, ERROR_MSGS, errors).isBoolean()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenString, function () {
      const input = '1'
      Validation.validate(input, ERROR_MSGS, errors).isBoolean()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenEmptyString, function () {
      const input = ''
      Validation.validate(input, ERROR_MSGS, errors).isBoolean()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenObject, function () {
      const input = {}
      Validation.validate(input, ERROR_MSGS, errors).isBoolean()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenNull, function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors).isBoolean()
      assert.equal(errors[0], MISSING_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenUndefined, function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors).isBoolean()
      assert.equal(errors[0], MISSING_KEY)
    })
  })

  describe('Object', function () {
    it('should not return errors when given object', function () {
      const input = {}
      Validation.validate(input, ERROR_MSGS, errors).isObject()
      assert.equal(errors.length, 0)
    })

    it(shouldReturnInvalidErrorWhenGivenNumber, function () {
      const input = 1
      Validation.validate(input, ERROR_MSGS, errors).isObject()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenString, function () {
      const input = '1'
      Validation.validate(input, ERROR_MSGS, errors).isObject()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenEmptyString, function () {
      const input = ''
      Validation.validate(input, ERROR_MSGS, errors).isObject()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenNull, function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors).isObject()
      assert.equal(errors[0], MISSING_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenUndefined, function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors).isObject()
      assert.equal(errors[0], MISSING_KEY)
    })
  })

  describe('Object not empty', function () {
    it('should not return errors when given object with parameters', function () {
      const input = { foo: 'bar' }
      Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
      assert.equal(errors.length, 0)
    })

    it('should return invalid error when given empty object', function () {
      const input = {}
      Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenNumber, function () {
      const input = 1
      Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenString, function () {
      const input = '1'
      Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenEmptyString, function () {
      const input = ''
      Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenNull, function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
      assert.equal(errors[0], MISSING_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenUndefined, function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
      assert.equal(errors[0], MISSING_KEY)
    })
  })

  describe('ObjectId', function () {
    it('should not return errors when given an ObjectId', function () {
      const input = new ObjectID()
      Validation.validate(input, ERROR_MSGS, errors).isObjectId()
      assert.equal(errors.length, 0)
    })

    it('should not return errors when given number', function () {
      const input = 1
      Validation.validate(input, ERROR_MSGS, errors).isObjectId()
      assert.equal(errors.length, 0)
    })

    it('should not return errors when given string with 24 chars', function () {
      const input = '60661c2d8d01cf15042a47c8'
      Validation.validate(input, ERROR_MSGS, errors).isObjectId()
      assert.equal(errors.length, 0)
    })

    it(shouldReturnInvalidErrorWhenGivenObject, function () {
      const input = {}
      Validation.validate(input, ERROR_MSGS, errors).isObjectId()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenString, function () {
      const input = '1'
      Validation.validate(input, ERROR_MSGS, errors).isObjectId()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenEmptyString, function () {
      const input = ''
      Validation.validate(input, ERROR_MSGS, errors).isObjectId()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenNull, function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors).isObjectId()
      assert.equal(errors[0], MISSING_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenUndefined, function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors).isObjectId()
      assert.equal(errors[0], MISSING_KEY)
    })
  })

  describe('Email', function () {
    it('should not return errors when given an email', function () {
      const input = 'foo@bar.com'
      Validation.validate(input, ERROR_MSGS, errors).isEmail()
      assert.equal(errors.length, 0)
    })

    it(shouldReturnInvalidErrorWhenGivenRandomString, function () {
      const input = 'foo bar'
      Validation.validate(input, ERROR_MSGS, errors).isEmail()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenEmptyString, function () {
      const input = ''
      Validation.validate(input, ERROR_MSGS, errors).isEmail()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenNull, function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors).isEmail()
      assert.equal(errors[0], MISSING_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenUndefined, function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors).isEmail()
      assert.equal(errors[0], MISSING_KEY)
    })
  })

  describe('UUID', function () {
    it('should not return errors when given an UUID v1', function () {
      const input = '647877ca-1092-11ec-82a8-0242ac130003'
      Validation.validate(input, ERROR_MSGS, errors).isUUID()
      assert.equal(errors.length, 0)
    })

    it('should not return errors when given an UUID v4', function () {
      const input = 'c897926b-237a-4cf0-897e-162008e58ab5'
      Validation.validate(input, ERROR_MSGS, errors).isUUID()
      assert.equal(errors.length, 0)
    })

    it(shouldReturnInvalidErrorWhenGivenRandomString, function () {
      const input = 'foo bar'
      Validation.validate(input, ERROR_MSGS, errors).isUUID()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnInvalidErrorWhenGivenEmptyString, function () {
      const input = ''
      Validation.validate(input, ERROR_MSGS, errors).isUUID()
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenNull, function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors).isUUID()
      assert.equal(errors[0], MISSING_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenUndefined, function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors).isUUID()
      assert.equal(errors[0], MISSING_KEY)
    })
  })

  describe('Custom', function () {
    const foo = (bar) => bar % 2 === 0

    it('should not return errors when given input is valid', function () {
      const input = 2
      Validation.validate(input, ERROR_MSGS, errors).custom(foo)
      assert.equal(errors.length, 0)
    })

    it('should return invalid error when given invalid input', function () {
      const input = 1
      Validation.validate(input, ERROR_MSGS, errors).custom(foo)
      assert.equal(errors[0], INVALID_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenNull, function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors).custom(foo)
      assert.equal(errors[0], MISSING_KEY)
    })

    it(shouldReturnMissingErrorWhenGivenUndefined, function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors).custom(foo)
      assert.equal(errors[0], MISSING_KEY)
    })
  })

  describe('Optional value', function () {
    it('should not return errors when given null', function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors).isOptional()
        .isBoolean()
      assert.equal(errors.length, 0)
    })

    it('should not return errors when given undefined', function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors).isOptional()
        .isBoolean()
      assert.equal(errors.length, 0)
    })
  })

  describe('Is Valid', function () {
    let func = {}

    beforeEach(function () {
      func = sandbox.spy()
    })

    it('should exec func when property is valid', function () {
      const input = 'string-test'
      Validation.validate(input, ERROR_MSGS, errors)
        .isString()
        .isValid(func)

      assert.equal(errors.length, 0)
      assert.ok(func.calledOnce)
    })

    it('should not exec func when property is invalid', function () {
      const input = 1
      Validation.validate(input, ERROR_MSGS, errors)
        .isString()
        .isValid(func)

      assert.equal(errors.length, 1)
      assert.ok(func.notCalled)
    })
  })

  describe('Is Array', function () {
    it('should not return errors when given input is valid', function () {
      const input = []
      Validation.validate(input, ERROR_MSGS, errors)
        .isArray()

      assert.equal(errors.length, 0)
    })

    it('should return error when give string', function () {
      const input = '[]'
      Validation.validate(input, ERROR_MSGS, errors)
        .isArray()

      assert.equal(errors.length, 1)
      assert.equal(errors[0], INVALID_KEY)
    })

    it('should return error when give number', function () {
      const input = 1
      Validation.validate(input, ERROR_MSGS, errors)
        .isArray()

      assert.equal(errors.length, 1)
      assert.equal(errors[0], INVALID_KEY)
    })

    it('should return error when give null', function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors)
        .isArray()

      assert.equal(errors.length, 1)
      assert.equal(errors[0], MISSING_KEY)
    })

    it('should return error when give undefined', function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors)
        .isArray()

      assert.equal(errors.length, 1)
      assert.equal(errors[0], MISSING_KEY)
    })
  })

  describe('Is Array Not Empty', function () {
    it('should not return errors when given input is array', function () {
      const input = [1]
      Validation.validate(input, ERROR_MSGS, errors)
        .isArrayNotEmpty()

      assert.equal(errors.length, 0)
    })

    it('should return error when array is empty', function () {
      const input = []
      Validation.validate(input, ERROR_MSGS, errors)
        .isArrayNotEmpty()

      assert.equal(errors.length, 1)
      assert.equal(errors[0], INVALID_KEY)
    })

    it('should return error when give string', function () {
      const input = '[]'
      Validation.validate(input, ERROR_MSGS, errors)
        .isArrayNotEmpty()

      assert.equal(errors.length, 1)
      assert.equal(errors[0], INVALID_KEY)
    })

    it('should return error when give number', function () {
      const input = 1
      Validation.validate(input, ERROR_MSGS, errors)
        .isArrayNotEmpty()

      assert.equal(errors.length, 1)
      assert.equal(errors[0], INVALID_KEY)
    })

    it('should return error when give null', function () {
      const input = null
      Validation.validate(input, ERROR_MSGS, errors)
        .isArrayNotEmpty()

      assert.equal(errors.length, 1)
      assert.equal(errors[0], MISSING_KEY)
    })

    it('should return error when give undefined', function () {
      const input = undefined
      Validation.validate(input, ERROR_MSGS, errors)
        .isArrayNotEmpty()

      assert.equal(errors.length, 1)
      assert.equal(errors[0], MISSING_KEY)
    })
  })
})
