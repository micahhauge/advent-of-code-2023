import { parseInput } from ".";

type Position = {
  x: number;
  y: number;
};

export async function solve() {
  const input = await parseInput(false);
  const lines = input.split("\n");
  let xMasCount = 0;

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const position = { x, y };
      if (isXMAS(lines, position)) {
        xMasCount++;
      }
    }
  }

  return xMasCount;
}

function isXMAS(lines: string[], position: Position) {
  const char = lines[position.y][position.x];
  if (char !== "A") {
    return false;
  }
  console.log("here");

  console.log("here");

  if (
    position.x < 1 ||
    position.y < 1 ||
    position.x >= lines[0].length - 1 ||
    position.y >= lines.length - 1
  ) {
    return false;
  }

  const topLeftChar = lines[position.y - 1][position.x - 1];
  const topRightChar = lines[position.y - 1][position.x + 1];
  const bottomLeftChar = lines[position.y + 1][position.x - 1];
  const bottomRightChar = lines[position.y + 1][position.x + 1];

  console.log({ topLeftChar, topRightChar, bottomLeftChar, bottomRightChar });

  if (
    topLeftChar === undefined ||
    topRightChar === undefined ||
    bottomLeftChar === undefined ||
    bottomRightChar === undefined
  ) {
    return false;
  }

  console.log("here");

  const forwardSlashIsMas =
    (bottomLeftChar === "M" && topRightChar === "S") ||
    (bottomLeftChar === "S" && topRightChar === "M");

  const backSlashIsMas =
    (topLeftChar === "M" && bottomRightChar === "S") ||
    (topLeftChar === "S" && bottomRightChar === "M");

  return forwardSlashIsMas && backSlashIsMas;
}
