import { createFormatter } from "../src";

describe("", () => {

  const format = createFormatter({ unit: "g" });

  test("should ", () => {
    const result = format(10);
    expect(result).toBe("10 g");
  });

});
