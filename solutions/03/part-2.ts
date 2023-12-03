import { sum } from "lodash";
import { parseInput } from ".";

export async function solve() {
  const input = await parseInput();
  console.log(input);
  const parts: number[] = [];
  let partsSum = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      // console.log(input[y][x]);
      if (isDigit(input[y][x])) {
        if (isDigit(input[y][x - 1])) {
          continue;
        }

        const number = getEntireNumber(x, y, input);
        const isAdjacentToSymbol = wholeNumberAdjacentToSymbol(
          x,
          y,
          number,
          input,
        );
        console.log("found whole num", number, { isAdjacentToSymbol });

        if (isAdjacentToSymbol) {
          parts.push(parseInt(number));
          partsSum += parseInt(number);
        }
      }
    }
  }

  return partsSum;
}

function wholeNumberAdjacentToSymbol(
  x: number,
  y: number,
  number: string,
  input: string[],
) {
  for (let i = 0; i < number.length; i++) {
    if (digitAdjacentToSymbol(x + i, y, input)) {
      return true;
    }
  }
  return false;
}

function digitAdjacentToSymbol(x: number, y: number, input: string[]) {
  // console.log({ x, y });
  const left = input[y]?.[x - 1];
  const right = input[y]?.[x + 1];
  const up = input[y - 1]?.[x];
  const down = input[y + 1]?.[x];
  const upRight = input[y - 1]?.[x + 1];
  const upLeft = input[y - 1]?.[x - 1];
  const downLeft = input[y + 1]?.[x - 1];
  const downRight = input[y + 1]?.[x + 1];

  // console.log({ left, right, up, down, upRight, upLeft, downLeft, downRight });

  return (
    isSymbol(left) ||
    isSymbol(right) ||
    isSymbol(up) ||
    isSymbol(down) ||
    isSymbol(upRight) ||
    isSymbol(upLeft) ||
    isSymbol(downLeft) ||
    isSymbol(downRight)
  );
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

function isSymbol(char: string | undefined) {
  if (char === undefined) return false;

  return !isDigit(char) && char !== ".";
}
