'use strict';

/**
 * @typedef {import('../../ddd').IEntity} IEntity
 */

const { MetaClass } = require('@leonid-shutov/meta-class');

const entityFactory = (parent) =>
  /** @implements {IEntity} */
  class extends parent {
    #id;

    constructor({ id, ...rest }) {
      super(rest);

      this.#id = id;
    }

    get id() {
      return this.#id;
    }

    isEqual(comparable) {
      return this.id === comparable.id;
    }
  };

const Entity = Object.entries(MetaClass).reduce(
  (accum, [from, strategy]) => ({
    ...accum,
    [from]: (x) => {
      const { metaClass } = strategy(x);
      return entityFactory(metaClass);
    },
  }),
  {},
);

module.exports = { Entity };
