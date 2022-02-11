module.exports = {
  errors: {
    asc: {
      invalid: 'ASC_IS_INVALID',
      required: 'ASC_IS_REQUIRED'
    },
    desc: {
      invalid: 'DESC_IS_INVALID',
      required: 'DESC_IS_REQUIRED'
    },
    fields: {
      invalid: 'FIELDS_IS_INVALID',
      required: 'FIELDS_IS_REQUIRED'
    },
    limit: {
      invalid: 'LIMIT_IS_INVALID',
      required: 'LIMIT_IS_REQUIRED'
    },
    offset: {
      invalid: 'OFFSET_IS_INVALID',
      required: 'OFFSET_IS_REQUIRED'
    },
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
