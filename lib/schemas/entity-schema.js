"use strict";

const { DomainObjectZodSchema } = require("./domain-object-schema");

const EntityZodSchema = DomainObjectZodSchema.pick({ isEqual: true });

module.exports = { EntityZodSchema };
