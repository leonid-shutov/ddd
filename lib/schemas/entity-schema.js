"use strict";

const { z } = require("zod");
const { DomainObjectZodSchema } = require("./domain-object-schema");

const EntityZodSchema = DomainObjectZodSchema.pick({ isEqual: true }).extend({
  id: z.string(),
});

module.exports = { EntityZodSchema };
