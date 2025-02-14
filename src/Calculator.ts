export class Calculator {
  static readonly DEFAULT_DELIMITER = ',';

  add(input: string): number {
    if (input === '') {
      return 0;
    }

    const numbers = this.parse(input);

    return this.sum(numbers);
  }

  private parse(input: string) {
    const {delimiter, rest}: RegExpMatchArray = this.retrieveParts(input);

    const rawNumbers = rest.split(new RegExp(`[${delimiter}\n]`));

    return this.prepareNumbers(rawNumbers);
  }

  private retrieveParts(input: string): { delimiter: string, rest: string } {
    const extractRegex = new RegExp(
      `^(?://(?<delimiter>.{1})\n)?(?<rest>.*)`,
      's',
    );

    const matchedRegex = input.match(extractRegex);

    const {delimiter, rest}: RegExpMatchArray = matchedRegex?.groups;

    return {
      delimiter: delimiter ?? Calculator.DEFAULT_DELIMITER,
      rest,
    };
  }

  private prepareNumbers(numbers: string[]): number[] {
    const filteredNumbers = numbers.filter((item) => item !== '');

    return filteredNumbers.map((item) => Number(item));
  }

  private sum(numbers: number[]) {
    return numbers.reduce((acc, n) => acc + n);
  }
}
