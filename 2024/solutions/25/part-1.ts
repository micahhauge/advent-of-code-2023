import { parseInput } from ".";

type Key = {
  type: "key";
  heights: [number, number, number, number, number];
};

type Lock = {
  type: "lock";
  heights: [number, number, number, number, number];
};

const mockLock = `#####
.####
.####
.####
.#.#.
.#...
.....`;

const mockKey = `.....
#....
#....
#...#
#.#.#
#.###
#####`;

export async function solve() {
  const input = await parseInput(true);

  parseRawInput(input);

  // const lines = input.split("\n");
  const t = parseLock(mockLock);
  const k = parseKey(mockKey);
  console.log(k);

  return "Not implemented.";
}

function parseRawInput(rawInput: string) {
  const rawKeysAndLocks = rawInput.split("\n\n");
  const keysAndLocks = rawKeysAndLocks.map(parseRawInputToKeyOrLock);

  console.log(keysAndLocks);
}

function parseRawInputToKeyOrLock(rawKeyOrLock: string) {
  if (rawKeyOrLock.startsWith("#")) {
    return parseKey(rawKeyOrLock);
  }

  return parseLock(rawKeyOrLock);
}

/**
 * 
 *
  #####
  .####
  .####
  .####
  .#.#.
  .#...
  .....
 
 */
function parseLock(rawLock: string): Lock {
  const lockLines = rawLock.split("\n").slice(1);
  const heights: Lock["heights"] = [0, 0, 0, 0, 0];

  lockLines.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "#") {
        heights[i]++;
      }
    }
  });

  return {
    type: "lock",
    heights: heights,
  };
}

function parseKey(rawKey: string): Key {
  const allKeyLines = rawKey.split("\n");
  const keyLines = allKeyLines.slice(0, allKeyLines.length - 1);

  const heights: Lock["heights"] = [0, 0, 0, 0, 0];

  keyLines.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "#") {
        heights[i]++;
      }
    }
  });

  return {
    type: "key",
    heights: heights,
  };
}
