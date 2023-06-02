const nodes = [];

async function simulateNetwork(callback) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(callback()), 2000);
  });
}

async function addNode(id, parentId, name) {
  return simulateNetwork(() => {
    if (!id || !parentId || !name) {
      throw "Arguments can not be null or undefined";
    }
    nodes.push({ id, parentId, name });
  });
}

async function getNodes() {
  return simulateNetwork(() => nodes);
}
