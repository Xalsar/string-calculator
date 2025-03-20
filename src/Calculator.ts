export class Calculator {
  static readonly VALIDATION_MESSAGE = 'negatives not allowed';

  static readonly DEFAULT_DELIMITER = ',';

  add(input: string): number {
    if (input === '') {
      return 0;
    }

    const numbers = this.parseNumbers(input);

    this.validateNumbers(numbers);

    const filtered = this.filterNumbers(numbers);

    return this.sum(filtered);
  }

  private parseNumbers(input: string) {
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
