import * as one from "./part-1";
import * as two from "./part-2";

console.log(`Part 1: `, await one.solve());
console.log(`Part 2: `, await two.solve());

export type SpringData = {
  springs: string;
  damagedGroups: number[];
};

export async function parseInput(example = true) {
  const file = `${import.meta.dir}/input${example ? "-example" : ""}.txt`;
  const input = await Bun.file(file).text();
  const lines = input.split("\n").filter(Boolean);

  const parsedLines = lines.map<SpringData>((line) => {
    const [springs, rawDamagedGroups] = line.split(" ");
    const damagedGroups = rawDamagedGroups.split(",").map(Number);

    return { springs, damagedGroups };
  });

  return parsedLines;
}
