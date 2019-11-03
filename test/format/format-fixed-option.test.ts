import { createFormatter } from "../../src";

describe("format fixed option", () => {

  test("should return with fixed number of decimal points", () => {
    const format = createFormatter({ fixed: true });
    const result = format(11);
    expect(result).toBe("11.0000");
  });

  test("should return with fixed number of decimal points", () => {
    const format = createFormatter({ fixed: true });
    const result = format(123e-3);
    expect(result).toBe("123.0000 m");
  });

  test("should return with fixed number of decimal points (with unit)", () => {
    const format = createFormatter({ unit: "g", fixed: true });
    const result = format(123e-3);
    expect(result).toBe("123.0000 mg");
  });

});
