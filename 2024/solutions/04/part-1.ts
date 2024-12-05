import { parseInput } from ".";

type Position = {
  x: number;
  y: number;
};

export async function solve() {
  return 1;
  const input = await parseInput(false);
  const lines = input.split("\n");

  const topLine = lines[0];
  const diagonals = [...getRightDiagonals(lines), ...getLeftDiagonals(lines)];

  console.log(diagonals);

  // get columns
  const columns = [];
  for (let i = 0; i < topLine.length; i++) {
    const col = getAlternateDimensionString(
      lines,
      { x: i, y: 0 },
      { x: 0, y: 1 },
    );
    columns.push(col);
  }

  console.log(input);

  const forwardStrings = [...lines, ...diagonals, ...columns];
  const reversedStrings = forwardStrings.map((str) =>
    str.split("").reverse().join(""),
  );

  const allStringsToCheck = [...forwardStrings, ...reversedStrings];

  let totalCount = 0;

  allStringsToCheck.forEach((str) => {
    const xmasCount = countSubstringOccurrences(str, "XMAS");
    totalCount += xmasCount;
  });

  return totalCount;
}

function getRightDiagonals(lines: string[]) {
  const diagonals = [];
  const topLine = lines[0];
  // Get diagonals from top line
  for (let i = 0; i < topLine.length; i++) {
    const startingPosition = { x: i, y: 0 };
    const diagonal = getAlternateDimensionString(lines, startingPosition, {
      x: -1,
      y: 1,
    });
    diagonals.push(diagonal);
  }

  // Get diagonals from right column
  for (let i = 1; i < lines.length; i++) {
    const startingPosition = { x: lines[i].length - 1, y: i };
    const diagonal = getAlternateDimensionString(lines, startingPosition, {
      x: -1,
      y: 1,
    });
    diagonals.push(diagonal);
  }

  return diagonals;
}

function getLeftDiagonals(lines: string[]) {
  const diagonals = [];
  const topLine = lines[0];
  // Get diagonals from top line
  for (let i = 0; i < topLine.length; i++) {
    const startingPosition = { x: i, y: 0 };
    const diagonal = getAlternateDimensionString(lines, startingPosition, {
      x: 1,
      y: 1,
    });
    diagonals.push(diagonal);
  }

  // Get diagonals from right column
  for (let i = 1; i < lines.length; i++) {
    const startingPosition = { x: 0, y: i };
    const diagonal = getAlternateDimensionString(lines, startingPosition, {
      x: 1,
      y: 1,
    });
    diagonals.push(diagonal);
  }

  return diagonals;
}

function countSubstringOccurrences(str: string, substr: string) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (substringIsAtPosition(str, substr, i)) {
      count += 1;
    }
  }

  return count;
}

function substringIsAtPosition(str: string, substr: string, position: number) {
  return str.indexOf(substr, position) === position;
}

function getAlternateDimensionString(
  lines: string[],
  startPosition: Position,
  direction: Position,
) {
  let position = startPosition;
  let dimensionString = "";

  while (
    position.y < lines.length &&
    position.x < lines[position.y].length &&
    position.x >= 0 &&
    position.y >= 0
  ) {
    dimensionString += lines[position.y][position.x];
    position.x += direction.x;
    position.y += direction.y;
  }

  return dimensionString;
}
