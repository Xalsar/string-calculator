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
    const splited = input.split(/[,\n]/);

    const filtered = splited.filter((item) => item !== "");

    const mapped = filtered.map((item) => Number(item));

    return mapped;
  }

  private sum(numbers: number[]) {
    return numbers.reduce((acc, n) => acc + n);
  }
}
