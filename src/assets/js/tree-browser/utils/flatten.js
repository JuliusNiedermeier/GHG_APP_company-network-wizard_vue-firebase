export default function (nestedNodes) {
  function traverse(_node, parentId) {
    const node = { ..._node };
    if (node.children) {
      node.hasChildren = true;
      node.children.forEach((childNode) => traverse(childNode, node.id));
      delete node.children;
    } else {
      node.hasChildren = false;
    }
    flatNodes.push({ ...node, parentId: parentId });
  }

  const flatNodes = [];

  nestedNodes.forEach((node) => {
    traverse(node);
  });

  return flatNodes;
}

export function newMethod(nestedNodes) {
  function i(node) {
    if (node.hasChildren) {
      node.children.forEach((childNode) => i(childNode, node.parentId));
    }
    nodeList[node.id] = node;
  }

  const nodeList = {};

  nestedNodes.forEach((node) => i(node));

  return nodeList;
}
