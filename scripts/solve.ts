import { padDay } from "../lib/helpers";

const [, , day] = Bun.argv;
const dayPadded = padDay(day);

const proc = Bun.spawn(["bun", `./2024/solutions/${dayPadded}/index.ts`]);

const out = await new Response(proc.stdout).text();
console.log(out);
