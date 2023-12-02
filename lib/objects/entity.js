'use strict';

/**
 * @typedef {import('../../ddd').IEntity} IEntity
 * @typedef {import('../../ddd').TEntityProps} TEntityProps
 */

const { MetaClass } = require('@leonid-shutov/meta-class');

/** @param {new (x: TEntityProps) => TEntityProps} parent */
const entityFactory = (parent) =>
  /** @implements {IEntity} */
  class extends parent {
    isEqual(comparable) {
      return this.id === comparable.id;
    }
  };

const Entity = Object.entries(MetaClass).reduce(
  (accum, [from, strategy]) => ({
    ...accum,
    [from]: (x) => {
      const { metaClass, metaData } = strategy(x);
      if (!metaData.keys.includes('id'))
        throw new Error('Entity must have an id');
      return entityFactory(metaClass);
    },
  }),
  {},
);

module.exports = { Entity };
