"use strict";

/** @typedef {import('../../ddd').IValueObject<any>} IValueObject */

const { MetaClass } = require("@leonid-shutov/meta-class");
const { isEqual } = require("lodash");

const valueObjectFactory = (parent, keys) =>
  /** @implements {IValueObject} */
  class extends parent {
    isEqual(comparable) {
      return keys.every((key) => {
        if (this[key].isEqual) {
          return this[key].isEqual(comparable[key]);
        }

        return isEqual(this[key], comparable[key]);
      });
    }
  };

const ValueObject = Object.entries(MetaClass).reduce(
  (accum, [from, strategy]) => ({
    ...accum,
    [from]: (x) => {
      const { metaClass, metaData } = strategy(x);
      return valueObjectFactory(metaClass, metaData.keys);
    },
  }),
  {}
);

module.exports = { ValueObject };
