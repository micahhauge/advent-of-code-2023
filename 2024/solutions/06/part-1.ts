import { parseInput } from ".";

type Position = {
  x: number;
  y: number;
};

type Direction = "up" | "down" | "left" | "right";

export async function solve() {
  const input = await parseInput();

  const lines = input.split("\n");
  const visited = new Set<string>();
  const startingPosition = getStartingPosition(lines);

  let currentPosition = startingPosition;
  let currentDirection: Direction = "up";
  let inBounds = true;

  function moveGuard() {
    const nextPosition = getNextPositionInDirection(
      currentPosition,
      currentDirection,
    );

    const nextPosOutOfMap = !isPositionWithinBounds(nextPosition, lines);
    if (nextPosOutOfMap) {
      throw new Error("Next position is out of map.");
    }

    const nextPositionChar = lines[nextPosition.y][nextPosition.x];
    const isBlocked = nextPositionChar === "#";

    if (isBlocked) {
      currentDirection = getNextClockwiseDirection(currentDirection);
    } else {
      currentPosition = nextPosition;
    }
  }

  visited.add(`${currentPosition.x},${currentPosition.y}`);
  while (inBounds) {
    try {
      moveGuard();
      visited.add(`${currentPosition.x},${currentPosition.y}`);
    } catch (e) {
      inBounds = false;
    }
  }

  return visited.size;
}

function isPositionWithinBounds(position: Position, lines: string[]): boolean {
  return (
    position.x >= 0 &&
    position.x <= lines[0].length - 1 &&
    position.y >= 0 &&
    position.y <= lines.length - 1
  );
}

function getNextClockwiseDirection(direction: Direction): Direction {
  if (direction === "right") {
    return "down";
  } else if (direction === "down") {
    return "left";
  } else if (direction === "left") {
    return "up";
  } else {
    return "right";
  }
}

function getNextPositionInDirection(
  position: Position,
  direction: Direction,
): Position {
  if (direction === "up") {
    return {
      x: position.x,
      y: position.y - 1,
    };
  } else if (direction === "down") {
    return {
      x: position.x,
      y: position.y + 1,
    };
  } else if (direction === "left") {
    return {
      x: position.x - 1,
      y: position.y,
    };
  } else if (direction === "right") {
    return {
      x: position.x + 1,
      y: position.y,
    };
  }

  throw new Error("Invalid direction.");
}

function getStartingPosition(lines: string[]): Position {
  for (let y = 0; y < lines.length; y++) {
    const currentLine = lines[y];
    const guardIndex = currentLine.indexOf("^");

    if (guardIndex !== -1) {
      return { x: guardIndex, y };
    }
  }

  throw new Error("Guard not found.");
}
