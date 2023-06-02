<template>
  <div class="tree-browser">
    <BaseTreeBrowserNode
      v-for="node in nodes"
      :key="node.name"
      :node="node"
      :origin="[]"
      :itemComponent="node.itemComponent"
      @actionclicked="onActionclicked"
    />
  </div>
</template>

<script>
import BaseTreeBrowserNode from "./BaseTreeBrowserNode.vue";
import { flattenNestedNodes } from "../assets/js/tree-browser/utils";
export default {
  components: { BaseTreeBrowserNode },
  name: "BaseTreeBrowser",
  props: {
    nodes: Array,
  },

  setup(props, context) {
    const nodeList = flattenNestedNodes(props.nodes);

    function onActionclicked(event) {
      if (event.detail.type) {
        context.emit(event.detail.type, event);
      } else {
        console.warn("Node events must have a type property");
      }
    }

    return { onActionclicked };
  },
};
</script>
