import * as one from "./part-1";
import * as two from "./part-2";

// console.log(`Part 1: `, await one.solve());
console.log(`Part 2: `, await two.solve());

export type Race = {
  time: number;
  distanceRecord: number;
};

export async function parseInput(example = false) {
  const file = `${import.meta.dir}/input${example ? "-example" : ""}.txt`;
  const input = (await Bun.file(file).text()).split("\n");

  const times = input[0]
    .trim()
    .split(": ")[1]
    .trim()
    .split(/\s+/)
    .map((t) => Number(t));
  const distanceRecords = input[1]
    .trim()
    .split(":")[1]
    .trim()
    .split(/\s+/)
    .map((t) => Number(t));

  const races: Race[] = [];

  times.forEach((time, i) => {
    races.push({ time, distanceRecord: distanceRecords[i] });
  });

  return { races };
}
