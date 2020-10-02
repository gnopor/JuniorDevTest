const main = require("./index");

test("Main is a function", () => {
  expect(typeof main).toEqual("function");
});

test("call main", () => {
  expect(main).not.toThrow();
});
