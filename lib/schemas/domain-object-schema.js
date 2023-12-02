'use strict';

const { z } = require('zod');

const DomainObjectZodSchema = z.object({
  isEqual: z.function().returns(z.boolean()),
});

module.exports = { DomainObjectZodSchema };
