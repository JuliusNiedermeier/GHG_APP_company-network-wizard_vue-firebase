function search(nodes, callback) {
  let result;

  nodes.forEach((node) => {
    if (result) return;
    if (callback(node)) {
      result = node;
    } else if (node.hasChildren) {
      result = search(node.childCollection, callback);
    }
  });

  return result;
}

function forEachNode(childNodes, callback) {
  childNodes.forEach((childNode) => {
    callback(childNode);
    if (childNode.hasChildren) forEachNode(childNode.childCollection, callback);
  });
}

export default class TreeBrowserNodeTree {
  constructor(nodes) {
    this.rootNodes = nodes;
  }

  findNodeById(id) {
    return search(this.rootNodes, (node) => node.id == id);
  }

  findNode(callback) {
    return search(this.rootNodes, callback);
  }

  forEach(callback) {
    forEachNode(this.rootNodes, callback);
  }
}
