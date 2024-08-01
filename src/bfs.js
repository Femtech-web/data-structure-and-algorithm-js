const path = require("node:path");
const fs = require("node:fs/promises");

const graph = new Map();

graph.set("femi", ["tunde", "tade", "bolu", "joseph"]);
graph.set("bolu", ["isaac", "mango seller"]);
graph.set("tunde", ["iremide"]);
graph.set("tade", ["kunle"]);
graph.set("joseph", []);
graph.set("isaac", []);
graph.set("mango seller", []);
graph.set("iremide", []);
graph.set("kunle", []);

console.log(graph);

function breadthFirstSearch(name) {
  let queueToSearch = [];
  let searchedName = new Set();

  queueToSearch = [...queueToSearch, ...graph.get(name)];

  while (queueToSearch.length !== 0) {
    let nextPerson = queueToSearch.shift();

    if (!searchedName.has(nextPerson)) {
      if (nextPerson.includes("mango seller")) {
        return nextPerson;
      } else {
        queueToSearch = [...queueToSearch, ...graph.get(nextPerson)];
        searchedName.add(nextPerson);
      }
    }
  }

  return false;
}

const result = breadthFirstSearch("femi");
console.log(result);

// -------- searching a file directory using bfs ------
async function searchFile(dir) {
  let queueToSearch = [];

  let initialpath = path.join(__dirname, dir);
  queueToSearch.push(initialpath);

  while (queueToSearch.length !== 0) {
    let pathToSearch = queueToSearch.shift();
    const contents = await fs.readdir(pathToSearch);

    for (let node of contents) {
      const filePath = path.join(pathToSearch, node);
      const stat = await fs.stat(filePath);

      if (stat.isFile()) {
        console.log(node);
      } else {
        queueToSearch.push(filePath);
      }
    }
  }

  return;
}

searchFile("test");
