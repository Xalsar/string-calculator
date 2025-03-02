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
    const customSquareBracketsDelimiters = this.extractDelimitersInSquareBrackets(input);

    if(customSquareBracketsDelimiters) {
      const delimiters = this.extractIndividualDelimiters(customSquareBracketsDelimiters);
      const rest = input.replace(this.customSquareBracketsDelimitersRegex, "");
      const splitterForRegex = delimiters.map(this.generateSplitterRegexForMultiCharDelimiter).join("|");
      const numbers = this.splitNumbers(rest, splitterForRegex);
      return numbers;
    }

    const customDelimiter = this.extractCustomDelimiter(input);

    if (customDelimiter) {
      const rest = input.replace(this.customDelimiterRegex, "");
      const numbers = this.splitNumbers(rest, customDelimiter);

      return numbers;
    }

    const numbers = this.splitNumbers(input, ",");
    return numbers;
  }

  private extractIndividualDelimiters(input: string) {
    return input.split("][").map(d => d.replace(/[\[\]]/g, ""));
  }

  private extractDelimitersInSquareBrackets(input: string) {
    const {
      customSquareBracketsDelimiters
    } = this.customSquareBracketsDelimitersRegex.exec(input)?.groups ?? {};

    return customSquareBracketsDelimiters;
  }

  private readonly customSquareBracketsDelimitersRegex = /^\/\/(?<customSquareBracketsDelimiters>\[.+\]+)\n/;

  private generateSplitterRegexForMultiCharDelimiter(customMultiCharDelimiter: string) {
    return customMultiCharDelimiter.split("").map(c => `\\${c}`).join("");
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
