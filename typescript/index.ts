interface Obj {
  name: string;
  roll: number;
}

class ObjClass {
  name: string;
  roll: number;

  constructor(name: string, roll: number) {
    this.name = name;
    this.roll = roll;
  }
}

const obj1: Obj = {
  name: "hello",
  roll: 12,
};

const obj2: ObjClass = new ObjClass("hello", 12);

function sum(a: number, b: number): number {
  return a + b;
}

type WindowStates = "open" | "closed";

// types can take variables (sortof like parameters)
// that define the type within that generic

// array of strings
type StringArray = Array<string>;

/*
 * typescript supports structural type system.
 *
 * i.e. it compares the *shape* of the type / interface
 * against the actual value
 * https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#structural-type-system
 *
 * see below for example
 */
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);

// works
const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"

// throws error
const color = { hex: "#187ABF" };
logPoint(color);
