"use strict";

const assert = require("node:assert");
const { describe, it } = require("node:test");
const { Entity } = require("./ddd");
const { ValueObject } = require("./ddd");

describe("Entity", () => {
  const Cat = Entity.fromKeys(["id", "name", "age", "color"]);
  const cat = new Cat({ id: "123", name: "Sanya", age: 3, color: "Orange tabbie" });

  it("Has correct properties", () => {
    assert.strictEqual(cat.id, "123");
    assert.strictEqual(cat.name, "Sanya");
    assert.strictEqual(cat.age, 3);
    assert.strictEqual(cat.color, "Orange tabbie");
  });

  it("Id is frozen", () => {
    const reassignId = () => {
      cat.id = "111";
    };
    assert.throws(reassignId, TypeError);
  });

  it("Throws when no id", () => {
    const createEntityWithNoId = () => Entity.fromKeys(["a", "b"]);
    assert.throws(createEntityWithNoId, Error);
  });

  it("Compares by id", () => {
    assert.strictEqual(
      new (Entity.fromKeys(["id", "x"]))({ id: "123", x: 3 }).isEqual(
        new (Entity.fromKeys(["id", "x"]))({ id: "123", x: 5 })
      ),
      true
    );
    assert.strictEqual(
      new (Entity.fromKeys(["id", "x"]))({ id: "123", x: 3 }).isEqual(
        new (Entity.fromKeys(["id", "x"]))({ id: "321", x: 3 })
      ),
      false
    );
  });
});

describe("Entity", () => {
  const Cat = ValueObject.fromKeys(["name", "age", "color"]);
  const cat = new Cat({ name: "Sanya", age: 3, color: "Orange tabbie" });

  it("Has correct properties", () => {
    assert.strictEqual(cat.name, "Sanya");
    assert.strictEqual(cat.age, 3);
    assert.strictEqual(cat.color, "Orange tabbie");
  });

  it("Compares by each property", () => {
    assert.strictEqual(
      new (ValueObject.fromKeys(["x", "y", "z"]))({ x: 1, y: [1, 2, 3], z: { a: 1, b: [2] } }).isEqual(
        new (ValueObject.fromKeys(["x", "y", "z"]))({ x: 1, y: [1, 2, 3], z: { a: 1, b: [2] } })
      ),
      true
    );
  });
});
