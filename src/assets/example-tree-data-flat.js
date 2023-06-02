import exampleTreeData from "./example-tree-data";

function traverse(node, parentId) {
  if (node.children) {
    node.children.forEach((childNode) => traverse(childNode, node.id));
    delete node.children;
  }
  flatData.push({ ...node, parentId: parentId });
}

const consoleTimeLabel = "Flattened tree data in";
console.time(consoleTimeLabel);

const flatData = [];

exampleTreeData.forEach((node) => {
  traverse(node);
});

console.timeEnd(consoleTimeLabel);

export default flatData;
