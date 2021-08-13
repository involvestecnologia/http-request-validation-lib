module.exports = {
  errors: {
    requestId: {
      invalid: 'REQUEST_ID_INVALID',
      required: 'REQUEST_ID_IS_REQUIRED'
    },
    schema: {
      invalid: 'SCHEMA_IS_INVALID',
      required: 'SCHEMA_IS_REQUIRED'
    }
  },
  headers: {
    requestId: 'x-request-id',
    schema: 'x-involves-schema'
  }
}
