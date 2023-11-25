"use strict";

const { DomainObjectZodSchema } = require("./domain-object-schema");

const ValueObjectZodSchema = DomainObjectZodSchema.pick({ isEqual: true });

module.exports = { ValueObjectZodSchema };
