export default function (flatNodes) {
  function addChildren(node) {
    if (node.hasChildren === false) return node;

    node.children = flatNodes.filter(
      (childNode) => childNode.parentId == node.id
    );

    node.children.forEach(addChildren);
    return node;
  }

  return flatNodes.filter((node) => !node.parentId).map(addChildren);
}
