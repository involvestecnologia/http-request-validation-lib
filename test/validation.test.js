const assert = require('assert').strict

const { ObjectID } = require('mongodb')
const { Validation } = require('../index')

const INVALID_KEY = "invalid_key"
const MISSING_KEY = "missing_key"

const ERROR_MSGS = {
    invalid: INVALID_KEY,
    required: MISSING_KEY
}

describe('Validation tool test suite', () => {
    let errors

    beforeEach(() => {
        errors = []
    })

    describe('String', () => {
        it('should not return errors when given string', () => {
            const input = '1'
            Validation.validate(input, ERROR_MSGS, errors).isString()
            assert.equal(errors.length, 0)
        })

        it('should not return errors when given empty string', () => {
            const input = ''
            Validation.validate(input, ERROR_MSGS, errors).isString()
            assert.equal(errors.length, 0)
        })

        it('should return invalid error when given number', () => {
            const input = 1
            Validation.validate(input, ERROR_MSGS, errors).isString()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given boolean', () => {
            const input = true
            Validation.validate(input, ERROR_MSGS, errors).isString()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given object', () => {
            const input = {}
            Validation.validate(input, ERROR_MSGS, errors).isString()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return missing error when given null', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isString()
            assert.equal(errors[0], MISSING_KEY)
        })

        it('should return missing error when given undefined', () => {
            const input = undefined
            Validation.validate(input, ERROR_MSGS, errors).isString()
            assert.equal(errors[0], MISSING_KEY)
        })

        describe('Minimum and maximum length is set', () => {
            it('should not return errors when given string with minimum length', () => {
                const input = '1'
                Validation.validate(input, ERROR_MSGS, errors).isString(1, 255)
                assert.equal(errors.length, 0)
            })

            it('should not return errors when given string is empty but minimum length is zero', () => {
                const input = ''
                Validation.validate(input, ERROR_MSGS, errors).isString(0, 255)
                assert.equal(errors.length, 0)
            })

            it('should return invalid error when given string dont have the minimum length', () => {
                const input = '1'
                Validation.validate(input, ERROR_MSGS, errors).isString(32, 32)
                assert.equal(errors[0], INVALID_KEY)
            })

            it('should return invalid error when given string exceeds the maximum length', () => {
                const input = 'abc'
                Validation.validate(input, ERROR_MSGS, errors).isString(1, 2)
                assert.equal(errors[0], INVALID_KEY)
            })
        })
    })

    describe('Number', () => {
        it('should not return errors when given number', () => {
            const input = 1
            Validation.validate(input, ERROR_MSGS, errors).isNumber()
            assert.equal(errors.length, 0)
        })

        it('should return invalid error when given string', () => {
            const input = '1'
            Validation.validate(input, ERROR_MSGS, errors).isNumber()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given empty string', () => {
            const input = ''
            Validation.validate(input, ERROR_MSGS, errors).isNumber()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given boolean', () => {
            const input = true
            Validation.validate(input, ERROR_MSGS, errors).isNumber()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given object', () => {
            const input = {}
            Validation.validate(input, ERROR_MSGS, errors).isNumber()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return missing error when given null', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isNumber()
            assert.equal(errors[0], MISSING_KEY)
        })

        it('should return missing error when given undefined', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isNumber()
            assert.equal(errors[0], MISSING_KEY)
        })
    })

    describe('Boolean', () => {
        it('should not return errors when given boolean', () => {
            const input = true
            Validation.validate(input, ERROR_MSGS, errors).isBoolean()
            assert.equal(errors.length, 0)
        })

        it('should return invalid error when given number', () => {
            const input = 1
            Validation.validate(input, ERROR_MSGS, errors).isBoolean()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given string', () => {
            const input = '1'
            Validation.validate(input, ERROR_MSGS, errors).isBoolean()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given empty string', () => {
            const input = ''
            Validation.validate(input, ERROR_MSGS, errors).isBoolean()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given object', () => {
            const input = {}
            Validation.validate(input, ERROR_MSGS, errors).isBoolean()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return missing error when given null', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isBoolean()
            assert.equal(errors[0], MISSING_KEY)
        })

        it('should return missing error when given undefined', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isBoolean()
            assert.equal(errors[0], MISSING_KEY)
        })
    })

    describe('Object', () => {
        it('should not return errors when given object', () => {
            const input = {}
            Validation.validate(input, ERROR_MSGS, errors).isObject()
            assert.equal(errors.length, 0)
        })

        it('should return invalid error when given number', () => {
            const input = 1
            Validation.validate(input, ERROR_MSGS, errors).isObject()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given string', () => {
            const input = '1'
            Validation.validate(input, ERROR_MSGS, errors).isObject()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given empty string', () => {
            const input = ''
            Validation.validate(input, ERROR_MSGS, errors).isObject()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return missing error when given null', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isObject()
            assert.equal(errors[0], MISSING_KEY)
        })

        it('should return missing error when given undefined', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isObject()
            assert.equal(errors[0], MISSING_KEY)
        })
    })

    describe('Object not empty', () => {
        it('should not return errors when given object with parameters', () => {
            const input = { a: 'a' }
            Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
            assert.equal(errors.length, 0)
        })

        it('should return invalid error when given empty object', () => {
            const input = {}
            Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given number', () => {
            const input = 1
            Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given string', () => {
            const input = '1'
            Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given empty string', () => {
            const input = ''
            Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return missing error when given null', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
            assert.equal(errors[0], MISSING_KEY)
        })

        it('should return missing error when given undefined', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isObjectNotEmpty()
            assert.equal(errors[0], MISSING_KEY)
        })
    })

    describe('ObjectId', () => {
        it('should not return errors when given an ObjectId', () => {
            const input = new ObjectID()
            Validation.validate(input, ERROR_MSGS, errors).isObjectId()
            assert.equal(errors.length, 0)
        })

        it('should not return errors when given number', () => {
            const input = 1
            Validation.validate(input, ERROR_MSGS, errors).isObjectId()
            assert.equal(errors.length, 0)
        })

        it('should not return errors when given string with 24 chars', () => {
            const input = '60661c2d8d01cf15042a47c8'
            Validation.validate(input, ERROR_MSGS, errors).isObjectId()
            assert.equal(errors.length, 0)
        })

        it('should return invalid error when given object', () => {
            const input = {}
            Validation.validate(input, ERROR_MSGS, errors).isObjectId()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given string', () => {
            const input = '1'
            Validation.validate(input, ERROR_MSGS, errors).isObjectId()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return invalid error when given empty string', () => {
            const input = ''
            Validation.validate(input, ERROR_MSGS, errors).isObjectId()
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return missing error when given null', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isObjectId()
            assert.equal(errors[0], MISSING_KEY)
        })

        it('should return missing error when given undefined', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isObjectId()
            assert.equal(errors[0], MISSING_KEY)
        })
    })

    describe('Custom', () => {
        const f = (a) => { return a % 2 === 0 }

        it('should not return errors when given input is valid', () => {
            const input = 2
            Validation.validate(input, ERROR_MSGS, errors).custom(f)
            assert.equal(errors.length, 0)
        })

        it('should return invalid error when given invalid input', () => {
            const input = 1
            Validation.validate(input, ERROR_MSGS, errors).custom(f)
            assert.equal(errors[0], INVALID_KEY)
        })

        it('should return missing error when given null', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).custom(f)
            assert.equal(errors[0], MISSING_KEY)
        })

        it('should return missing error when given undefined', () => {
            const input = undefined
            Validation.validate(input, ERROR_MSGS, errors).custom(f)
            assert.equal(errors[0], MISSING_KEY)
        })
    })

    describe('Optional value', () => {
        it('should not return errors when given null', () => {
            const input = null
            Validation.validate(input, ERROR_MSGS, errors).isOptional().isBoolean()
            assert.equal(errors.length, 0)
        }) 

        it('should not return errors when given undefined', () => {
            const input = undefined
            Validation.validate(input, ERROR_MSGS, errors).isOptional().isBoolean()
            assert.equal(errors.length, 0)
        }) 
    })
})