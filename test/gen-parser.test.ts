import { createParser } from "../src";

describe("", () => {

  const parse = createParser({});

  test("should return null on invalid numeric input", () => {
    const result = parse("10.3.4");
    expect(result).toBeNull();
  });

  test("should return null on non numeric input", () => {
    const result = parse("non-numeric");
    expect(result).toBeNull();
  });

  test("should parse number", () => {
    const result = parse(10);
    expect(result).toBe(10);
  });

  test("should parse numeric string", () => {
    const result = parse("10");
    expect(result).toBe(10);
  });

  test("should parse unit prefixed string", () => {
    const result = parse("10K");
    expect(result).toBe(10000);
  });

});
