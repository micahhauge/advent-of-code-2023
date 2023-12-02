import * as one from "./part-1";
import * as two from "./part-2";

console.log(`Part 1: `, await one.solve());
console.log(`Part 2: `, await two.solve());

export async function parseInput(example = true) {
  const file = `${import.meta.dir}/input${example ? "-example" : ""}.txt`;
  const input = (await Bun.file(file).text()) as string;

  console.log(input);

  return input;
}
