import { parseInput } from ".";
import { sum } from "lodash";

export async function solve() {
  const input = await parseInput();

  const arrs = input.map((i) =>
    getPossibleSpringArrangements(i.springs, i.damagedGroups),
  );

  return sum(arrs);
}

/**

# = broken
. = operational
? = wild


. 0 => 1
. 1 => 0

? 0 => 0
? 1 => 1

? X,X => 0

# 1 => 1
# 0 => 0




# X,X => 0
# X
  if X > 1 => 0
  if X == 1 => 1




?.? X,X => 1

.??..??...?##. 1,1,3 -> 4

..??.. 1 -> 2

??...?##. 1,3 -> 2
  Possibilities: 2
    .#...###.
    #....###.


?...?## -> 1,3



input:
.??.?# 1,2 

try:
.#?.?# 
  try:
  ?##.?# 1,2


???? 1,1
#.#.
.#.#

try:
???? 1,1
 #??? 1,1
  ##?? 1,1
 .??? 1,1



*/

function getPossibleSpringArrangements(
  springs: string,
  damagedGroups: number[],
): number {
  if (springs === ".") {
    if (damagedGroups.length === 0) {
      return 1;
    }
  }

  return 0;
}
