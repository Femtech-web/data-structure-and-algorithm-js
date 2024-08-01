const path = require("node:path");
const fs = require("node:fs/promises");

async function deepFirstSearch(dir) {
  const initialpath = path.join(__dirname, dir);
  const contents = await fs.readdir(initialpath);

  for (let name of contents) {
    let fullPath = path.join(initialpath, name);
    const stat = await fs.stat(fullPath);

    if (stat.isFile()) {
      console.log(name);
    } else {
      let nextDir = `${dir}/${name}`;
      deepFirstSearch(nextDir);
    }
  }
}

deepFirstSearch("test");
