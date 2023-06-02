<template>
  <div class="tree-browser">
    <BaseTreeBrowserNode
      v-for="node in nodeCollection.nodes"
      :key="node.id"
      :node="node"
    />
  </div>
</template>

<script>
import { onBeforeUnmount, watch } from "@vue/runtime-core";
import BaseTreeBrowserNode from "./BaseTreeBrowserNode.vue";
import { TreeBrowserNodeCollection } from "../assets/js/tree-browser/utils";
export default {
  components: { BaseTreeBrowserNode },
  name: "BaseTreeBrowser",
  props: {
    nodeCollection: {
      type: TreeBrowserNodeCollection,
      default: () => new TreeBrowserNodeCollection([]),
    },
  },

  setup(props, context) {
    const stopNodesWatcher = watch(
      props.nodeCollection.nodes,
      () => {
        const eventSources = [];
        props.nodeCollection.forEachNode((node) => {
          if (node.event) eventSources.push(node);
        });

        if (!eventSources.length) return;
        eventSources.forEach((node) => {
          context.emit(node.event.type, node);
          delete node.event;
        });
      },
      { deep: true }
    );

    onBeforeUnmount(stopNodesWatcher);
  },
};
</script>
