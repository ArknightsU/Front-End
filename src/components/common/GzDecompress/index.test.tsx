import axios from "axios";
import gzDecompress from "./index";

const json_gz_url = "https://arknightsu.github.io/json/character_table.json.gz";
const json_url = "https://arknightsu.github.io/json/character_table.json";
test("gzip time test", async () => {
    const starttime = performance.now();
    const data = await gzDecompress(json_gz_url);
    const endtime = performance.now();
    console.log("gz complete time: ", endtime - starttime);
});

test("json time test", async () => {
    const starttime = performance.now();
    const data = await (await axios.get(json_gz_url)).data;
    const endtime = performance.now();
    console.log("json complete time: ", endtime - starttime);
})