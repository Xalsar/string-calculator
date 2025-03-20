export class Calculator {
  static readonly VALIDATION_MESSAGE = 'negatives not allowed';

  static readonly DEFAULT_DELIMITER = ',';

  add(input: string): number {
    if (this.isEmpty(input)) {
      return 0;
    }

    const numbers = this.parseNumbers(input);

    this.validateNumbers(numbers);

    const filtered = this.filterNumbers(numbers);

    return this.sum(filtered);
  }

  private isEmpty(input: string): bool {
    return input === '';
  }

  private parseNumbers(input: string) {
    const {delimiters, rest}: RegExpMatchArray = this.retrieveParts(input);

    const preparedDelimiters = delimiters.join('|').replace(/[.*+?^${}()[\]\\]/g, '\\$&');
    const rawNumbers = rest.split(new RegExp(preparedDelimiters + '|\n'));

    return this.prepareNumbers(rawNumbers);
  }

  private retrieveParts(input: string): { delimiters: string[], rest: string } {
    const extractRegex = new RegExp(
      `^(?://(?<delimiter>.+)\n)?(?<rest>.*)`,
      's',
    );

    const matchedRegex = input.match(extractRegex);

    const {delimiter: rawDelimiter, rest: rawRest}: RegExpMatchArray = matchedRegex?.groups;
    const delimiters = (rawDelimiter !== undefined)
      ? rawDelimiter.replace(/^\[|\]$/g, '').split('][')
      : [Calculator.DEFAULT_DELIMITER];

    return {
      delimiters: delimiters,
      rest: rawRest,
    };
  }

  private prepareNumbers(numbers: string[]): number[] {
    const filteredNumbers = numbers.filter((item) => item !== '');

    return filteredNumbers.map((item) => Number(item));
  }

  private validateNumbers(numbers: number[]) {
    const invalid: number[] = [];

    numbers.forEach((number) => {
      if (number < 0) {
        invalid.push(number);
      }
    });

    if (invalid.length > 0) {
      throw new Error(Calculator.VALIDATION_MESSAGE + ': ' + invalid.join(','));
    }
  }

  private filterNumbers(numbers: number[]) {
    return numbers.filter((number) => number <= 1000);
  }

  private sum(numbers: number[]) {
    return numbers.reduce((acc, n) => acc + n);
  }
}
