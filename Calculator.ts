export class Calculator {
  add(input: string): number {
    if (input === "") {
      return 0;
    }

    const numbers = this.parse(input);
    const total = this.sum(numbers);

    return total;
  }

  private parse(input: string) {
    const customDelimiterRegex = new RegExp(`^//(?<customDelimiter>.)\n`);
    const {
      customDelimiter
    } = customDelimiterRegex.exec(input)?.groups ?? {};

    if (customDelimiter) {
      const rest = input.replace(customDelimiterRegex, "");

      const splitRegex = new RegExp(`${customDelimiter}|\\n`);
      const numbers = rest.split(splitRegex).map(Number);

      return numbers;
    }

    const numbers = input.split(/,|\n/).map(Number);
    return numbers;

  }

  private sum(numbers: number[]) {
    return numbers.reduce((acc, n) => acc + n);
  }
}
