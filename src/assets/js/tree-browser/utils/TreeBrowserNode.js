export default class TreeBrowserNode {
  constructor(id, view, options) {
    if (!id) {
      throw Error("TreeBrowserNode must have a valid id");
    }

    if (!view || typeof view.component === "undefined" || !view.attributes) {
      throw Error(
        "TreeBrowserNode option 'view' must contain properties 'component' and 'attributes'"
      );
    }

    this.id = id;
    this.view = view;

    if (options && Object.keys(options).length) {
      if (options.parentId) this.parentId = options.parentId;
      if (options.childCollection)
        this.childCollection = options.childCollection;
    }
  }

  get hasChildren() {
    if (!this.childCollection || !this.childCollection.size) {
      return false;
    } else {
      return this.childCollection.size;
    }
  }
}
