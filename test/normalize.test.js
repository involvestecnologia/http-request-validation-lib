const assert = require('assert').strict
const normalize = require('../src/normalize')

describe('Validation normalize', function () {
  describe('convertSnakeCaseToCamelCase', function () {
    it('should return empty object when not pass object', function () {
      const value = ''

      const result = normalize.convertSnakeCaseToCamelCase(value)

      assert.ok(Object.keys(result).length === 0)
    })

    it('should return not error', function () {
      const value = {
        test_a: 1
      }

      const result = normalize.convertSnakeCaseToCamelCase(value)

      assert.ok(Object.keys(result).length === 1)
      assert.equal(result.testA, value.test_a)
    })

    it('should return not error when property name is extensive', function () {
      const value = {
        test_http_validation_lib: 1
      }

      const result = normalize.convertSnakeCaseToCamelCase(value)

      assert.ok(Object.keys(result).length === 1)
      assert.equal(result.testHttpValidationLib, value.test_http_validation_lib)
    })

    it('should convert when have object inside', function () {
      const value = {
        test_a: 1,
        test_b: {
          test_b_a: 1
        }
      }

      const result = normalize.convertSnakeCaseToCamelCase(value)

      assert.ok(Object.keys(result).length === 2)
      assert.equal(result.testA, value.test_a)
      assert.ok(result.testB)
      assert.equal(result.testB.testBA, value.test_b.test_b_a)
    })

    it('should convert when have array', function () {
      const value = {
        test_a: 1,
        test_b: [
          {
            test_b_a: 1
          }
        ]
      }

      const result = normalize.convertSnakeCaseToCamelCase(value)

      assert.ok(Object.keys(result).length === 2)
      assert.equal(result.testA, value.test_a)
      assert.ok(result.testB)
      assert.ok(result.testB.length === 1)
      assert.equal(result.testB[0].testBA, value.test_b[0].test_b_a)
    })
  })
})
