import { parseInput } from ".";
import { sum } from "lodash";

type Position = { x: number; y: number };

const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const RIGHT = { x: 1, y: 0 };
const LEFT = { x: -1, y: 0 };

const DIRECTIONS = [UP, DOWN, RIGHT, LEFT];

export async function solve() {
  const input = await parseInput(false);
  console.log(input);

  const grid = input.split("\n");
  const trailheads = findTrailHeads(grid);

  const trailHeadScores = trailheads.map((p) => followTrailhead(grid, p));
  const sumOfTrailHeadScores = sum(trailHeadScores);

  const test = followTrailhead(grid, { x: 2, y: 0 });
  console.log({ test });

  return sumOfTrailHeadScores;
}

function followTrailhead(grid: string[], p: Position) {
  const pathPositions: Position[][] = [[p]];

  for (let i = 0; i < 9; i++) {
    const nextPositions = pathPositions[pathPositions.length - 1].flatMap((p) =>
      getNextTrailPositions(grid, p),
    );

    pathPositions.push(nextPositions);
  }

  const finalPositions = pathPositions[pathPositions.length - 1];

  const finalPositionsSet = new Set<string>();

  finalPositions.forEach((p) => {
    finalPositionsSet.add(`${p.x},${p.y}`);
  });

  return finalPositions.length;
}

function getNextTrailPositions(
  grid: string[],
  currentPosition: Position,
): Position[] {
  const currentPositionValue = getValueAtPosition(grid, currentPosition);

  if (currentPositionValue === null) {
    throw new Error("Invalid position");
  }

  const possibleNextPositions: Position[] = [];

  DIRECTIONS.forEach((direction) => {
    try {
      const positionInDirection = addPositions(currentPosition, direction);
      const valueInDirection = getValueAtPosition(grid, positionInDirection);

      if (valueInDirection === currentPositionValue + 1) {
        possibleNextPositions.push(positionInDirection);
      }
    } catch (e) {
      // Ignore, since the direction is out of bounds
    }
  });

  return possibleNextPositions;
}

function findTrailHeads(grid: string[]): Position[] {
  const trailheads: Position[] = [];

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (cell === "0") {
        trailheads.push({ x: j, y: i });
      }
    }
  }

  return trailheads;
}

function addPositions(a: Position, b: Position): Position {
  return { x: a.x + b.x, y: a.y + b.y };
}

function getValueAtPosition(grid: string[], position: Position): number {
  if (
    position.y < 0 ||
    position.y >= grid.length ||
    position.x < 0 ||
    position.x >= grid[position.y].length
  ) {
    throw new Error(`No value at position ${position.x}, ${position.y}`);
  }

  return Number(grid[position.y][position.x]);
}
