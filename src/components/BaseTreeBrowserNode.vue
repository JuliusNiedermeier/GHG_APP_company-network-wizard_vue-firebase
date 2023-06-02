<template>
  <div class="tree-browser-node" ref="nodeRef">
    <component
      v-if="node.view.component"
      :is="node.view.component"
      :node="node"
      :expanded="expanded"
      v-bind="node.view.attributes"
      @togglerequest="onTogglerequest"
      @action="onAction"
    />
    <span v-else>{{ node.id }}</span>
    <div
      class="tree-browser-node__children"
      v-if="node.hasChildren && expanded"
    >
      <BaseTreeBrowserNode
        v-for="childNode in node.childCollection.nodes"
        :key="childNode.id"
        :node="childNode"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { TreeBrowserNode } from "../assets/js/tree-browser/utils";
export default {
  name: "BaseTreeBrowserNode",
  props: {
    node: TreeBrowserNode,
  },

  setup(props) {
    const nodeRef = ref(null);
    const expanded = ref(true);

    function onAction(event) {
      props.node.event = event;
    }

    function onTogglerequest(event) {
      expanded.value = !expanded.value;
    }

    return {
      nodeRef,
      expanded,
      onAction,
      onTogglerequest,
    };
  },
};
</script>

<style>
.tree-browser-node__children {
  padding-left: 2rem;
  border-left: 1px solid grey;
}
</style>
