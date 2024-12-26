import { parseInput } from ".";

type Key = {
  type: "key";
  heights: [number, number, number, number, number];
};

type Lock = {
  type: "lock";
  heights: [number, number, number, number, number];
};

type KeyLockCombo = {
  lock: Lock;
  key: Key;
  keyFitsInLock: boolean;
};

const mockLock = `#####
.####
.####
.####
.#.#.
.#...
.....`;

const mockKey = `.....
.....
.....
#....
#.#..
#.#.#
#####`;

export async function solve() {
  const input = await parseInput();

  const { keys, locks } = parseRawInput(input);

  const keyLockCombos: KeyLockCombo[] = [];

  locks.forEach((lock) => {
    keys.forEach((key) => {
      const keyFitsInLock = checkIfKeyFitsInLock(key, lock);
      keyLockCombos.push({ lock, key, keyFitsInLock });
    });
  });

  const validCombos = keyLockCombos.filter((combo) => combo.keyFitsInLock);

  return validCombos.length;
}

function checkIfKeyFitsInLock(key: Key, lock: Lock) {
  for (let i = 0; i < key.heights.length; i++) {
    const keyHeight = key.heights[i];
    const lockHeight = lock.heights[i];

    if (keyHeight + lockHeight > 5) {
      return false;
    }
  }

  return true;
}

function parseRawInput(rawInput: string) {
  const rawKeysAndLocks = rawInput.trim().split("\n\n");
  const keysAndLocks = rawKeysAndLocks.map(parseRawInputToKeyOrLock);

  const keys = keysAndLocks.filter((keyOrLock) => keyOrLock.type === "key");
  const locks = keysAndLocks.filter((keyOrLock) => keyOrLock.type === "lock");

  return { keys, locks };
}

function parseRawInputToKeyOrLock(rawKeyOrLock: string) {
  if (rawKeyOrLock.startsWith("#")) {
    return parseLock(rawKeyOrLock);
  }

  return parseKey(rawKeyOrLock);
}

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
  console.log("parsing key");
  console.log(rawKey);
  console.log(heights);

  return {
    type: "key",
    heights: heights,
  };
}
