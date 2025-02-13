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
    const delimiterExtractorRegex = new RegExp(
      `^(?://(?<delimiter>.{1})\n)?(?<rest>.*)`
    );

    const matchedRegex = input.match(delimiterExtractorRegex);

    const { delimiter, rest } = matchedRegex?.groups as {
      delimiter: string | undefined;
      rest: string;
    };

    const customDelimiter = delimiter ?? ",";

    const splitRegex = new RegExp(`[${customDelimiter}\n]`);

    console.log("rest", rest);

    const splited = rest.split(splitRegex);

    const filtered = splited.filter((item) => item !== "");

    const mapped = filtered.map((item) => Number(item));

    return mapped;
  }

  private sum(numbers: number[]) {
    return numbers.reduce((acc, n) => acc + n);
  }
}
