'use strict';

const { z } = require('zod');

const DomainObjectZodSchema = {
  fromModelSchema: (modelSchema) =>
    z.object({
      isEqual: z.function().args(modelSchema).returns(z.boolean()),
    }),
};

module.exports = { DomainObjectZodSchema };
