let statesNeeded = new Set([
  "oha",
  "itu",
  "jasa",
  "kale",
  "tayon",
  "jake",
  "ale",
  "tor",
]);

const stations = new Map();
stations.set("kOne", ["tayon", "jake", "ale"]);
stations.set("kTwo", ["itu", "tayon", "oha"]);
stations.set("kThree", ["jasa", "tayon", "ale"]);
stations.set("kFour", ["tayon", "jake"]);
stations.set("kFive", ["ale", "tor"]);

function findStations() {
  const finalStations = new Set();

  while (statesNeeded.size > 0) {
    let bestStation = null;
    let stateCovered = new Set();

    for (let [station, value] of stations.entries()) {
      let covered = new Set(
        [...statesNeeded].filter((state) => value.includes(state))
      );

      if (covered.size > stateCovered.size) {
        bestStation = station;
        stateCovered = covered;
      }
    }

    if (bestStation) {
      finalStations.add(bestStation);
      statesNeeded = new Set(
        [...statesNeeded].filter((state) => !stateCovered.has(state))
      );
    } else {
      break;
    }
  }

  return finalStations;
}

const bestStations = findStations();
console.log(bestStations);
