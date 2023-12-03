import { parseInput } from ".";

export async function solve() {
  const input = await parseInput();
  console.log(input);

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      console.log(input[y][x]);
      if (isDigit(input[y][x])) {
        if (isDigit(input[y][x - 1])) {
          continue;
        }

        const number = getEntireNumber(x, y, input);

        console.log("found digit", input[x][y]);
        console.log("found whole num", number);
      }
    }
  }
  console.log("here");

  return "Not implemented.";
}

function getEntireNumber(x: number, y: number, input: string[]) {
  let number = "";
  let i = x;
  while (isDigit(input[y][i])) {
    number += input[y][i];
    i++;
  }
  return number;
}

function isDigit(char: string) {
  return char >= "0" && char <= "9";
}
