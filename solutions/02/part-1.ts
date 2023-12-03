import { parseInput } from ".";
import { sum, uniq } from "lodash";

export async function solve() {
  const input = await parseInput();
  console.log(input);

  let possibleGameIds: number[] = [];
  input.forEach((game) => {
    let gamePossible = true;
    game.forEach((hand) => {
      // only 12 red cubes, 13 green cubes, and 14 blue cubes
      if (hand.red <= 12 && hand.green <= 13 && hand.blue <= 14) {
      } else {
        gamePossible = false;
      }
    });

    if (gamePossible) {
      possibleGameIds.push(game[0].id);
    }
  });

  possibleGameIds = uniq(possibleGameIds);

  console.log("possible", possibleGameIds);

  return sum(possibleGameIds);
}
