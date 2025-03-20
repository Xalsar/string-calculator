import {Calculator} from '../src/Calculator';
import {describe, expect, test} from 'vitest';

describe("Calculator", () => {
  const calculator = new Calculator();

  test("should return 0 if string is empty", () => {
    expect(calculator.add('')).toBe(0);
  });

  test("should return 1 if string is '1'", () => {
    expect(calculator.add('1')).toBe(1);
  });

  test("should return 3 if string is '3'", () => {
    expect(calculator.add('3')).toBe(3);
  });

  test("should return 5 if string is '2,3'", () => {
    expect(calculator.add('2,3')).toBe(5);
  });

  test("should allow an unknown amount of numbers", () => {
    expect(calculator.add('1,2,3,4,5')).toBe(15);
  });

  test("should allow lines between numbers", () => {
    expect(calculator.add('1\n2,3')).toBe(6);
  });

  test("should allow to change the delimiter", () => {
    expect(calculator.add('//;\n1;2')).toBe(3);
  });

  test("should not allow a single negative number", () => {
    expect(() => calculator.add('-1')).toThrowError(/-1/);
  });

  test("should not allow multiple negative numbers", () => {
    expect(() => calculator.add('-1,3,-2')).toThrowError(/-1,-2/);
  });

  test("should sum number equal to 1000", () => {
    expect(calculator.add('//;\n1000;2')).toBe(1002);
  });

  test("should ignore numbers greater than 1000", () => {
    expect(calculator.add('//;\n1001;2')).toBe(2);
  });

  test("should allow delimiters of any length", () => {
    expect(calculator.add('//[***]\n1***2***3')).toBe(6);
  });

  test("should allow multiple delimiters", () => {
    expect(calculator.add('//[*][%]\n1*2%3')).toBe(6);
  });
});
