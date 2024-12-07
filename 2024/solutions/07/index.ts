import * as one from "./part-1";
import * as two from "./part-2";

console.log(`Part 1: `, await one.solve());
console.log(`Part 2: `, await two.solve());

export type Equation = {
  testValue: number;
  numbers: number[];
};

export async function parseInput(example = false) {
  const file = `${import.meta.dir}/input${example ? "-example" : ""}.txt`;
  const input = await Bun.file(file).text();

  const lines = input.split("\n");

  const equations = lines.map((line) => {
    const [testValueString, numbersString] = line.split(": ");

    const testValue = Number(testValueString);
    const numbers = numbersString.split(" ").map(Number);

    return {
      testValue,
      numbers,
    };
  });

  return equations;
}
