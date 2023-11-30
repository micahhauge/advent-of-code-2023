import { Glob } from "bun";
import { mkdir } from "fs/promises";
import { padDay } from "../lib/helpers";

const [, , day, ...titleWords] = Bun.argv;
const dayPadded = padDay(day); // Pad the day number so they appear in order in the file structure
const title = titleWords.join(" ");

if (isNaN(parseInt(day, 10))) {
  throw new Error(
    `The first argument should be the day number. You gave "${day}".`,
  );
}

// Copy over scaffold files to given day directory
const solutionDir = `solutions/${dayPadded}`;
await mkdir(solutionDir, { recursive: true });

const scaffoldDir = ".scaffold";
const scaffoldGlob = new Glob("*");
for await (const file of scaffoldGlob.scan(scaffoldDir)) {
  const input = Bun.file(`${scaffoldDir}/${file}`);
  const output = Bun.file(`${solutionDir}/${file}`);

  // If a title was given, replace the recap.md placeholder with it
  if (title && file === "recap.md") {
    const recapData = await input.text();
    const titledData = recapData.replace("Title", title);
    await Bun.write(output, titledData);
    continue;
  }

  await Bun.write(output, input);
}

// Fetch the input for the day
const response = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
  headers: {
    cookie: `session=${process.env.ADVENT_SESSION}`,
  },
});

console.log(response);

await Bun.write(`${solutionDir}/input.txt`, response);
