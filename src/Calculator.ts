export class Calculator {
  add(input: string): number {
    if (input === '') {
      return 0;
    }

    const numbers = this.parse(input);
    const total = this.sum(numbers);

    return total;
  }

  private parse(input: string) {
    const delimiterExtractorRegex = new RegExp(
      `^(?://(?<delimiter>.{1})\n)?(?<rest>.*)`,
      's',
    );

    const matchedRegex = input.match(delimiterExtractorRegex);

    const {delimiter: customDelimiter, rest: inputRest}: RegExpMatchArray = matchedRegex?.groups;

    const delimiter = customDelimiter ?? ',';

    const splitRegex = new RegExp(`[${delimiter}\n]`);

    const splited = inputRest.split(splitRegex);

    const filtered = splited.filter((item) => item !== '');

    const mapped = filtered.map((item) => Number(item));

    return mapped;
  }

  private sum(numbers: number[]) {
    return numbers.reduce((acc, n) => acc + n);
  }
}
