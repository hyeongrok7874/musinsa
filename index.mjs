import { readFile } from "fs/promises";

const dailyRanking = JSON.parse(
  await readFile(new URL("./datas/ranking.json", import.meta.url))
);

export { dailyRanking };
