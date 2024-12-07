import { parseInput } from ".";

type Position = {
  x: number;
  y: number;
};

type Direction = "up" | "down" | "left" | "right";

export async function solve() {
  const input = await parseInput(false);

  const lines = input.split("\n");
  const visited = new Set<string>();
  const startingPosition = getStartingPosition(lines);

  let currentPosition = startingPosition;
  let currentDirection: Direction = "up";
  let inBounds = true;

  const obstaclePosition = { x: startingPosition.x - 1, y: startingPosition.y };
  // const obstaclePosition = { x: -1, y: 0 };

  const infiniteLoop = isScenarioInfiniteLoop(
    lines,
    startingPosition,
    obstaclePosition,
  );

  const positionsCausingInfiniteLoop: Position[] = [];

  for (let y = 0; y < lines.length; y++) {
    const currentLine = lines[y];
    for (let x = 0; x < currentLine.length; x++) {
      const positionToCheck = { x, y };
      const currentChar = currentLine[x];

      if (currentChar === "^") {
        continue;
      }

      if (currentChar === "#") {
        continue;
      }

      const positionCausesLoop = isScenarioInfiniteLoop(
        lines,
        startingPosition,
        positionToCheck,
      );

      if (positionCausesLoop) {
        positionsCausingInfiniteLoop.push(positionToCheck);
      }
    }
  }

  // console.log({ positionsCausingInfiniteLoop });

  return positionsCausingInfiniteLoop.length;
}

function isScenarioInfiniteLoop(
  startingLines: string[],
  startingPosition: Position,
  obstaclePosition: Position,
): boolean {
  const visited = new Set<string>();
  let currentPosition = startingPosition;
  let currentDirection: Direction = "up";
  let inBounds = true;

  const lines = placeObstacle(startingLines, obstaclePosition);

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

  visited.add(`${currentPosition.x},${currentPosition.y},${currentDirection}`);

  while (inBounds) {
    try {
      moveGuard();
      const nextPosDirForSet = `${currentPosition.x},${currentPosition.y},${currentDirection}`;

      if (visited.has(nextPosDirForSet)) {
        return true;
      }

      visited.add(
        `${currentPosition.x},${currentPosition.y},${currentDirection}`,
      );
    } catch (e) {
      inBounds = false;
    }
  }

  return false;
}

function placeObstacle(lines: string[], position: Position): string[] {
  // console.log("before");
  // console.log(lines.join("\n"));
  const lineToModify = lines[position.y];
  const lineAfterAddingObstruction = [
    ...lineToModify.slice(0, position.x),
    "#",
    ...lineToModify.slice(position.x + 1),
  ].join("");

  const modifiedLine = [
    ...lines.slice(0, position.y),
    lineAfterAddingObstruction,
    ...lines.slice(position.y + 1),
  ];

  // console.log("after");
  // console.log(modifiedLine.join("\n"));

  return modifiedLine;
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
