import { GameHand, parseInput } from ".";
import { sum, uniq } from "lodash";

export async function solve() {
  const input = await parseInput();
  console.log(input);

  const gamePowers = input.map((gameHands) => {
    const minimums: GameHand = gameHands[0];

    gameHands.forEach((hand) => {
      if (hand.blue > minimums.blue) {
        minimums.blue = hand.blue;
      }
      if (hand.green > minimums.green) {
        minimums.green = hand.green;
      }
      if (hand.red > minimums.red) {
        minimums.red = hand.red;
      }
    });

    return minimums.blue * minimums.red * minimums.green;
  });

  // let possibleGameIds: number[] = [];
  // input.forEach((game) => {
  //   let gamePossible = true;
  //   game.forEach((hand) => {
  //     // only 12 red cubes, 13 green cubes, and 14 blue cubes
  //     if (hand.red <= 12 && hand.green <= 13 && hand.blue <= 14) {
  //     } else {
  //       gamePossible = false;
  //     }
  //   });

  //   if (gamePossible) {
  //     possibleGameIds.push(game[0].id);
  //   }
  // });

  console.log(gamePowers);

  return sum(gamePowers);
}
