const hashTable = new Map();

hashTable.set("femi", 10);
hashTable.set("precious", 30);
hashTable.set("ade", ["tunde", "shade", "peller"]);

console.log(hashTable);

const newObj = {};

newObj["femi"] = 10;
newObj["precious"] = 20;
newObj["ade"] = ["tunde", "shade", "peller"];

console.log(newObj);

const newSet = new Set();
newSet.add("femi");
newSet.add("femzy");
newSet.add("ade");
newSet.add("ade");

console.log(newSet);
