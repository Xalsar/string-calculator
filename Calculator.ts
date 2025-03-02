export class Calculator {
  add(input: string): number {
    if (input === "") {
      return 0;
    }

    const numbers = this.parse(input);
    this.throwIfNegative(numbers);
    const total = this.sumNumbersLessThan1001(numbers);

    return total;
  }

  private parse(input: string) {
    const customDelimiter = this.extractCustomDelimiter(input);

    const customMultiCharDelimiterRegex = new RegExp(`^//\\[(?<customMultiCharDelimiter>.+)\\]\n`);

    const {
      customMultiCharDelimiter
    } = customMultiCharDelimiterRegex.exec(input)?.groups ?? {};

    if(customMultiCharDelimiter) {
      const rest = input.replace(customMultiCharDelimiterRegex, "");

      const splitterForRegex = customMultiCharDelimiter.split("").map(c => `\\${c}`).join("");

      const numbers = this.splitNumbers(rest, splitterForRegex);

      return numbers;
    }

    if (customDelimiter) {
      const rest = input.replace(this.customDelimiterRegex, "");
      const numbers = this.splitNumbers(rest, customDelimiter);

      return numbers;
    }

    const numbers = this.splitNumbers(input, ",");
    return numbers;
  }

  private readonly customDelimiterRegex = new RegExp(`^//(?<customDelimiter>.)\n`);

  private extractCustomDelimiter(input: string) {
    const {
      customDelimiter
    } = this.customDelimiterRegex.exec(input)?.groups ?? {};

    return customDelimiter;
  }

  private splitNumbers(input: string, delimiter: string) {
    const numbers = input.split(new RegExp(`${delimiter}|\\n`)).map(Number);
    return numbers;
  }

  private sumNumbersLessThan1001(numbers: number[]) {
    return numbers.reduce((acc, n) => {
      if (n > 1000) {
        return acc;
      }

      return acc + n
    });
  }

  private throwIfNegative(numbers: number[]) {
    const negatives = numbers.filter(n => n < 0);

    if (negatives.length) {
      throw new Error(`Negatives not allowed: ${negatives.join(",")}`);
    }
  }
}
