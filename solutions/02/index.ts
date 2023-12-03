import * as one from "./part-1";
import * as two from "./part-2";
import { flatten } from "lodash";

// console.log(`Part 1: `, await one.solve());
console.log(`Part 2: `, await two.solve());

export type Color = "red" | "blue" | "green";
export type Hand = {
  num: number;
  color: Color;
  id: number;
};

export type GameHand = Record<Color, number> & { id: number };

export async function parseInput(example = false) {
  const file = `${import.meta.dir}/input${example ? "-example" : ""}.txt`;
  const input = (await Bun.file(file).text()) as string;

  const lines = input.split("\n").filter((l) => l !== "");
  const gameHands = lines.map((line) => {
    const res = line.split(":");
    const gameId = parseInt(res[0].split(" ")[1]);

    const rawHandsFull = res[1];

    const handsStrings = rawHandsFull.split(";").map((i) => i.trim());
    const hands = handsStrings.map((hs) => hs.split(", "));

    const parsedHands = hands.map((rawHandGroup) => {
      const parsedHandGroups = rawHandGroup.map((rawHand) => {
        const [rawNumber, color] = rawHand.split(" ");

        const hand: Hand = {
          num: parseInt(rawNumber),
          color: color as Color,
          id: gameId,
        };

        return hand;
      });

      return parsedHandGroups;
    });

    return parsedHands;
  });

  const games = gameHands.map((handlist) => {
    return handlist.map((hands1) => {
      const initialGame: GameHand = {
        red: 0,
        green: 0,
        blue: 0,
        id: 0,
      };

      return hands1.reduce<GameHand>((acc, hand) => {
        return {
          ...acc,
          [hand.color]: acc[hand.color] + hand.num,
          id: parseInt(hand.id),
        };
      }, initialGame);
    });
  });

  return games;
}
