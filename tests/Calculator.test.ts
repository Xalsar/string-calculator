import { Calculator } from "../Calculator";
import { describe, expect, test } from "vitest";

describe("Calculator", () => {
  const calculator = new Calculator();

  test("should return 0 if string is empty", () => {
    expect(calculator.add("")).toBe(0);
  });

  test("should return 1 if string is '1'", () => {
    expect(calculator.add("1")).toBe(1);
  });

  test("should return 3 if string is '3'", () => {
    expect(calculator.add("3")).toBe(3);
  });

  test("should return 5 if string is '2,3'", () => {
    expect(calculator.add("2,3")).toBe(5);
  });

  test("should allow an unknown amount of numbers", () => {
    expect(calculator.add("1,2,3,4,5")).toBe(15);
  });

  test("should allow lines between numbers", () => {
    expect(calculator.add(`1\n2,3`)).toBe(6);
  });
});
