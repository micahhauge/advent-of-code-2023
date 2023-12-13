import { parseInput } from ".";
import { sum } from "lodash";

export async function solve() {
  const input = await parseInput();

  const arrs = input.map((i) =>
    getPossibleSpringArrangements(i.springs, i.damagedGroups),
  );

  return sum(arrs);
}

function getPossibleSpringArrangements(
  springs: string,
  damagedGroups: number[],
) {
  return 0;
}
