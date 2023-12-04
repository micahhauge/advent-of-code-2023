import * as one from "./part-1";
import * as two from "./part-2";

// console.log(`Part 1: `, await one.solve());
console.log(`Part 2: `, await two.solve());

export async function parseInput(example = false) {
  const file = `${import.meta.dir}/input${example ? "-example" : ""}.txt`;
  const input = await Bun.file(file).text();
  const lines = input.split("\n").filter((line) => line.length > 0);

  const p = lines.map((line) => {
    const cardId = Number(line.split(":")[0].split("Card ")[1]);
    const [winningNumsString, yourNumsString] = line.split(":")[1].split("|");

    const winningNumbers = winningNumsString
      .trim()
      .split(/\s+/)
      .map((n) => n.trim())
      .map((n) => Number(n));

    const yourNumbers = yourNumsString
      .trim()
      .split(/\s+/)
      .map((n) => n.trim())
      .map((n) => Number(n));

    return { cardId, winningNumbers, yourNumbers };
  });

  return p;
}
