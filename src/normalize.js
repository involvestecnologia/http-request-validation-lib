const Joi = require('joi')

class Normalize {
  static convertSnakeCaseToCamelCase (value) {
    const result = {}
    const objectSchema = Joi.object()
    const arraySchema = Joi.array()

    if (objectSchema.validate(value).error) return result

    for (const key in value) {
      const newKey = _buildKey(key)

      result[newKey] = value[key]

      if (!objectSchema.validate(result[newKey]).error) {
        result[newKey] = this.convertSnakeCaseToCamelCase(result[newKey])
        continue
      }

      if (!arraySchema.validate(result[newKey]).error) {
        result[newKey] = [...value[key]]
        for (const index in result[newKey]) {
          result[newKey][index] = this.convertSnakeCaseToCamelCase(result[newKey][index])
        }
      }
    }

    return result
  }
}

const _buildKey = (propertyKey) => {
  const frags = propertyKey.split('_')

  if (frags.length === 1) {
    return propertyKey
  }

  for (let index = 1; index < frags.length; index++) {
    frags[index] = frags[index].charAt(0).toUpperCase() + frags[index].slice(1)
  }

  return frags.join('')
}

module.exports = Normalize
