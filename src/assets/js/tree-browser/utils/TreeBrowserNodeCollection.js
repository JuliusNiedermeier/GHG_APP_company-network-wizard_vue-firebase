function search(nodes, callback) {
  let result;

  nodes.forEach((node) => {
    if (result) return;
    if (callback(node)) {
      result = node;
    } else if (node.hasChildren) {
      result = search(node.childCollection.nodes, callback);
    }
  });

  return result;
}

function forEach(nodes, callback) {
  nodes.forEach((node) => {
    callback(node);
    if (node.hasChildren) forEach(node.childCollection.nodes, callback);
  });
}

export default class TreeBrowserNodeCollection {
  constructor(nodes = []) {
    if (!nodes || !Array.isArray(nodes))
      throw Error(
        `Argument 'nodes' cannot be of type '${typeof nodes}'! Expecetd Array as argument.`
      );

    this.nodes = nodes;
  }

  findNodeById(id) {
    return search(this.nodes, (node) => node.id == id);
  }

  findNode(callback) {
    return search(this.nodes, callback);
  }

  forEachNode(callback) {
    forEach(this.nodes, callback);
  }

  get size() {
    return this.nodes.length;
  }
}
