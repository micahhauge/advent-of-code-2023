import { sum, flatten } from "lodash";
import { parseInput } from ".";

export async function solve() {
  const input = await parseInput();
  console.log(input);
  let answer = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (isGear(input[y][x])) {
        console.log("FOUND GEAR");
        const adjacentNumbers = getNumbersAdjacentToGear(x, y, input);

        const parsedAdjacentNumbers = flatten(adjacentNumbers).map((n) =>
          parseInt(n),
        );

        if (parsedAdjacentNumbers.length === 2) {
          const gearRatio = parsedAdjacentNumbers[0] * parsedAdjacentNumbers[1];
          console.log("RATIO", gearRatio);
          answer += gearRatio;
        }
      }
    }
  }

  return answer;
}

function isGear(char: string) {
  return char === "*";
}

function gearAdjacencyCount(x: number, y: number, input: string[]) {
  const left = input[y]?.[x - 1];
  const right = input[y]?.[x + 1];
  const up = input[y - 1]?.[x];
  const down = input[y + 1]?.[x];
  const upRight = input[y - 1]?.[x + 1];
  const upLeft = input[y - 1]?.[x - 1];
  const downLeft = input[y + 1]?.[x - 1];
  const downRight = input[y + 1]?.[x + 1];

  const topCount = getFullNumberCountInThreesome(upLeft, up, upRight);
  const leftCount = isDigit(left) ? 1 : 0;
  const rightCount = isDigit(right) ? 1 : 0;
  const bottomCount = getFullNumberCountInThreesome(downLeft, down, downRight);

  return topCount + leftCount + rightCount + bottomCount;
}

function getNumbersAdjacentToGear(x: number, y: number, input: string[]) {
  const left = input[y]?.[x - 1];
  const right = input[y]?.[x + 1];
  const up = input[y - 1]?.[x];
  const down = input[y + 1]?.[x];
  const upRight = input[y - 1]?.[x + 1];
  const upLeft = input[y - 1]?.[x - 1];
  const downLeft = input[y + 1]?.[x - 1];
  const downRight = input[y + 1]?.[x + 1];

  const topLeftOpt = isDigit(upLeft) ? "x" : "_";
  const topMiddleOpt = isDigit(up) ? "x" : "_";
  const topRightOpt = isDigit(upRight) ? "x" : "_";
  const topOption: OptCombos = `${topLeftOpt}${topMiddleOpt}${topRightOpt}`;

  const bottomLeftOpt = isDigit(downLeft) ? "x" : "_";
  const bottomMiddleOpt = isDigit(down) ? "x" : "_";
  const bottomRightOpt = isDigit(downRight) ? "x" : "_";
  const bottomOption: OptCombos = `${bottomLeftOpt}${bottomMiddleOpt}${bottomRightOpt}`;

  console.log({ topOption, bottomOption });

  const topNumbers = getAdjacentNumbersForThreesome(
    topOption,
    x - 1,
    y - 1,
    input,
  );
  const leftNumbers = isDigit(left) ? [getEntireNumber(x - 1, y, input)] : [];
  const rightNumbers = isDigit(right) ? [getEntireNumber(x + 1, y, input)] : [];
  const bottomNumbers = getAdjacentNumbersForThreesome(
    bottomOption,
    x - 1,
    y + 1,
    input,
  );

  console.log({ topNumbers, leftNumbers, rightNumbers, bottomNumbers });

  return [topNumbers, leftNumbers, rightNumbers, bottomNumbers];
}

type Opt = "x" | "_";
type OptCombos = `${Opt}${Opt}${Opt}`;
type OptComboToNumberCount = Record<OptCombos, number>;

const optComboToNumberCount: OptComboToNumberCount = {
  xxx: 1,
  xx_: 1,
  x_x: 2,
  _xx: 1,
  x__: 1,
  _x_: 1,
  __x: 1,
  ___: 0,
};

function getAdjacentNumbersForThreesome(
  opt: OptCombos,
  x: number,
  y: number,
  input: string[],
): string[] {
  if (opt === "xxx" || opt === "xx_" || opt === "x__") {
    return [getEntireNumber(x, y, input)];
  }

  if (opt === "x_x") {
    return [getEntireNumber(x, y, input), getEntireNumber(x + 2, y, input)];
  }

  if (opt === "__x" || opt === "_xx") {
    return [getEntireNumber(x + 2, y, input)];
  }

  if (opt === "_x_") {
    return [getEntireNumber(x + 1, y, input)];
  }

  if (opt === "___") {
    return [];
  } else {
    throw new Error(`Unknown opt: ${opt}`);
  }
}

function getFullNumberCountInThreesome(
  left: string,
  middle: string,
  right: string,
) {
  const leftOpt: Opt = isDigit(left) ? "x" : "_";
  const middleOpt: Opt = isDigit(middle) ? "x" : "_";
  const rightOpt: Opt = isDigit(right) ? "x" : "_";

  return optComboToNumberCount[`${leftOpt}${middleOpt}${rightOpt}`];
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

  // move to left side of number
  while (isDigit(input[y][i - 1])) {
    i--;
  }

  console.log("entire", { x, y, char: input[y][i] });

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
