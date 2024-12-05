import * as one from "./part-1";
import * as two from "./part-2";

console.log(`Part 1: `, await one.solve());
console.log(`Part 2: `, await two.solve());

export type RuleTuple = [number, number];

export async function parseInput(example = false) {
  const file = `${import.meta.dir}/input${example ? "-example" : ""}.txt`;
  const input = await Bun.file(file).text();

  const [rulesString, updatesString] = input.split("\n\n");

  const rules = rulesString.split("\n").map<RuleTuple>((rule) => {
    const [left, right] = rule.split("|");
    return [Number(left), Number(right)];
  });

  const updates = updatesString
    .split("\n")
    .map((updateString) => updateString.split(",").map(Number));

  return { rules, updates };
}
