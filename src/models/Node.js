export class Node {
  constructor(id, name, parentId) {
    if (typeof id !== "string" || typeof name !== "string") {
      throw Error("Must provide id and name to Node constructor");
    }

    this.id = id;
    this.name = name;

    if (typeof parentId == "string") {
      this.parentId = parentId;
    }
  }
}
