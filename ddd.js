"use strict";

const { MetaClass } = require("@leonid-shutov/meta-class");

const entityFromParent = (parent) =>
  class extends parent {
    isEqual(comparable) {
      return this.id === comparable.id;
    }
  };

const Entity = {
  fromKeys: (keys) => entityFromParent(MetaClass.fromKeys(keys)),
  fromZodSchema: (schema) => entityFromParent(MetaClass.fromZodSchema(schema)),
};

module.exports = { Entity };
