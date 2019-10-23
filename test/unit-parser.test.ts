import { createParser } from "../src";

describe("", () => {

  const parse = createParser({ unit: "g" });

  test("should parse number", () => {
    const result = parse(10);
    expect(result).toBe(10);
  });

  test("should parse numeric string", () => {
    const result = parse("10");
    expect(result).toBe(10);
  });

  test("should parse unit prefixed string", () => {
    const result = parse("10g");
    expect(result).toBe(10);
  });

  test("should parse unit prefixed string", () => {
    const result = parse("10m");
    expect(result).toBe(0.01);
  });

  test("should parse unit prefixed string", () => {
    const result = parse("10mg");
    expect(result).toBe(0.01);
  });

});
