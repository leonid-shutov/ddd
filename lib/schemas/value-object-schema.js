'use strict';

const { DomainObjectZodSchema } = require('./domain-object-schema');

const ValueObjectZodSchema = {
  fromModelSchema: (modelSchema) =>
    DomainObjectZodSchema.fromModelSchema(modelSchema).pick({ isEqual: true }),
};

module.exports = { ValueObjectZodSchema };
