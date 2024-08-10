// relationships/vertices
const start = new Map([
  ["A", 6],
  ["B", 2],
]);
const mapB = new Map([
  ["A", 3],
  ["finish", 5],
]);
const mapA = new Map([["finish", 1]]);

const graph = new Map();
graph.set("start", start);
graph.set("A", mapA);
graph.set("B", mapB);

// cost declaration
const infinity = Infinity;
const costGraph = new Map([
  ["A", 6],
  ["B", 2],
  ["finish", infinity],
]);

// parent declaration
const parentGraph = new Map([
  ["A", "start"],
  ["B", "start"],
  ["finish", null],
]);

const processedNode = new Set();

function findLowestCost(costs) {
  let lowestCost = infinity;
  let lowestNode = null;

  for (let node of costs.keys()) {
    const cost = costs.get(node);
    const notProcessed = !processedNode.has(node);

    if (cost < lowestCost && notProcessed) {
      lowestCost = cost;
      lowestNode = node;
    }
  }

  return lowestNode;
}

function findShortestPath() {
  let node = findLowestCost(costGraph);

  while (node !== null) {
    const cost = costGraph.get(node);
    const neighbours = graph.get(node);

    if (neighbours) {
      for (let n of neighbours.keys()) {
        let edgeCost = neighbours.get(n);
        let newCost = cost + edgeCost;

        if (costGraph.get(n) > newCost) {
          costGraph.set(n, newCost);
          parentGraph.set(n, node);
        }
      }
    }

    processedNode.add(node);
    node = findLowestCost(costGraph);
  }
}

findShortestPath();
console.log(parentGraph);
console.log(costGraph);
console.log(processedNode);
