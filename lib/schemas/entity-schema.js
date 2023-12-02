'use strict';

const { z } = require('zod');
const { DomainObjectZodSchema } = require('./domain-object-schema');

const EntityZodSchema = {
  fromModelSchema: (modelSchema) =>
    DomainObjectZodSchema.fromModelSchema(modelSchema)
      .pick({ isEqual: true })
      .extend({
        id: z.string(),
      }),
};

module.exports = { EntityZodSchema };
