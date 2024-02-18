'use strict';

const { randomUUID } = require('node:crypto');

/**
 * @typedef {import('../../ddd').IEntity} IEntity
 * @typedef {import('../../ddd').TEntityFactoryOptions} TFactoryOptions
 */

const { MetaClass } = require('@leonid-shutov/meta-class');

const entityFactory = (parent, { generateId }) =>
  /** @implements {IEntity} */
  class extends parent {
    constructor({ id, ...rest }) {
      super(rest);
      if (!id && !generateId) throw new Error('Entity must have an id');

      this.id = id || randomUUID();
    }

    isEqual(comparable) {
      return this.id === comparable.id;
    }
  };

const Entity = Object.entries(MetaClass).reduce(
  (accum, [from, strategy]) => ({
    ...accum,
    [from]: (x, options) => {
      const { metaClass } = strategy(x);
      return entityFactory(metaClass, options);
    },
  }),
  {},
);

module.exports = { Entity };
