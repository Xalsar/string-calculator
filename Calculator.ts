export class Calculator {
  add(input: string): number {
    if (input === "") {
      return 0;
    }

    const numbers = this.parse(input);
    const total = this.sum(numbers);

    return total;
  }

  private splitNumbers(input: string, delimiter: string) {
    const numbers = input.split(new RegExp(`${delimiter}|\\n`)).map(Number);
    return numbers;
  }

  private parse(input: string) {
    const customDelimiterRegex = new RegExp(`^//(?<customDelimiter>.)\n`);
    const {
      customDelimiter
    } = customDelimiterRegex.exec(input)?.groups ?? {};

    if (customDelimiter) {
      const rest = input.replace(customDelimiterRegex, "");
      const numbers = this.splitNumbers(rest, customDelimiter);

      return numbers;
    }

    const numbers = this.splitNumbers(input, ",");
    return numbers;

  }

  private sum(numbers: number[]) {
    this.throwIfNegative(numbers);

    return numbers.reduce((acc, n) => acc + n);
  }

  private throwIfNegative(numbers: number[]) {
    const negatives = numbers.filter(n => n < 0);

    if (negatives.length) {
      throw new Error(`Negatives not allowed: ${negatives.join(",")}`);
    }
  }
}
