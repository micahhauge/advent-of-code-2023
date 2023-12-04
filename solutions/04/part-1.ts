import { parseInput } from ".";
import { intersection } from "lodash";

export async function solve() {
  const input = await parseInput();
  console.log(input);

  let total = 0;

  input.forEach(({ winningNumbers, yourNumbers }) => {
    console.log("processing", { winningNumbers, yourNumbers });
    const overlap = intersection(winningNumbers, yourNumbers);
    console.log(overlap);

    let cardValue = 0;
    for (let i = 0; i < overlap.length; i++) {
      if (i === 0) {
        cardValue += 1;
      } else {
        cardValue *= 2;
      }
    }
    console.log("card value: ", cardValue);

    total += cardValue;
  });

  return total;
}
